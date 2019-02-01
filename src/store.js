import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    location: {},
    forecasts: {},
  },
  getters: {
    hourlyForecast(state) {
      const hourly = [];
      Object.values(state.forecasts).forEach((forecast) => {
        hourly.push(...forecast.hourly.data);
      });
      return hourly;
    },
    snowAccumulation(state) {
      let accumulation = 0;
      const now = Date.now();
      const nowDateString = new Date(now).toDateString();
      Object.values(state.forecasts).forEach((forecast) => {
        // 1. get daily snow accumulation for past days
        forecast.daily.data.forEach((dailyForecast) => {
          if (new Date(dailyForecast.date * 1000).toDateString() !== nowDateString) {
            if (dailyForecast.precipType === 'snow') {
              accumulation += dailyForecast.precipAccumulation;
            }
          }
        });
        // 2. get hourly snow accumulation for current day and only add past hours
        if (new Date(forecast.date).toDateString() === nowDateString) {
          forecast.hourly.data.forEach((hourlyForecast) => {
            if (hourlyForecast.time * 1000 < now) {
              if (hourlyForecast.precipType === 'snow') {
                accumulation += hourlyForecast.precipAccumulation;
              }
            }
          });
        }
      });
      return accumulation;
    },
    snowAccumulationForecast(state) {
      let accumulation = 0;
      const now = Date.now();
      const nowDateString = new Date(now).toDateString();
      Object.values(state.forecasts).forEach((forecast) => {
      // 1. get hourly snow accumulation predictions for future hours
        if (new Date(forecast.date).toDateString() === nowDateString) {
          forecast.hourly.data.forEach((hourlyForecast) => {
            if (hourlyForecast.time * 1000 > now) {
              if (hourlyForecast.precipType === 'snow') {
                accumulation += hourlyForecast.precipAccumulation;
              }
            }
          });
        }
      });
      return accumulation;
    },
  },
  actions: {
    updateLocation({ commit }, { latitude, longitude }) {
      commit('setItem', { item: 'location', value: { latitude, longitude } });
    },
    fetchForecasts({ dispatch }, { numDays }) {
      const days = Array(numDays).fill().map((_, i) => {
        const today = new Date();
        return new Date().setDate(today.getDate() - i);
      });
      return Promise.all(days.map(date => dispatch('fetchForecast', { date })));
    },
    fetchForecast({ state, commit }, { date }) {
      const forecastUrl = '/.netlify/functions/forecast/';
      return axios({
        url: forecastUrl,
        method: 'get',
        params: {
          latitude: state.location.latitude,
          longitude: state.location.longitude,
          time: Math.floor(date / 1000),
        },
      }).then((response) => {
        const forecast = response.data;
        commit('setForecast', { date, forecast });
        return forecast;
      }).catch(error => console.warn(error));
    },
  },
  mutations: {
    setItem(state, { item, value }) {
      Vue.set(state, item, value);
    },
    setForecast(state, { date, forecast }) {
      Vue.set(state.forecasts, date, { ...forecast, date });
    },
  },
});
