import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    setLocationOpen: false,
    location: {},
    forecasts: {},
    snowfallReadings: [],
    snowDepthReadings: [],
  },
  getters: {
    hourlyForecast(state) {
      const hourly = [];
      Object.values(state.forecasts).forEach((forecast) => {
        hourly.push(...forecast.hourly.data);
      });
      return hourly;
    },
    snowDepth(state) {
      const closestReading = state.snowDepthReadings
        .sort((a, b) => a.distanceToStation - b.distanceToStation)[0];
      if (closestReading) {
        return closestReading.Amount;
      }
      return 0;
    },
    snowAccumulation(state, getters) {
      const darkSkyAccumulation = getters.snowAccumulationDarkSky;
      const closestReading = state.snowfallReadings[0];
      if (closestReading && (closestReading.distanceToStation < 20 || darkSkyAccumulation === 0)) {
        return closestReading.Amount;
      }
      return darkSkyAccumulation;
    },
    snowAccumulationDarkSky(state) {
      let accumulation = 0;
      const now = Date.now();
      const nowDateString = new Date(now).toDateString();
      Object.values(state.forecasts).forEach((forecast) => {
        // 1. get daily snow accumulation for past days
        forecast.daily.data.forEach((dailyForecast) => {
          if (new Date(dailyForecast.date * 1000).toDateString() !== nowDateString) {
            if (dailyForecast.precipAccumulation) {
              accumulation += dailyForecast.precipAccumulation;
            }
          }
        });
        // 2. get hourly snow accumulation for current day and only add past hours
        if (new Date(forecast.date).toDateString() === nowDateString) {
          forecast.hourly.data.forEach((hourlyForecast) => {
            if (hourlyForecast.time * 1000 < now) {
              if (hourlyForecast.precipAccumulation) {
                accumulation += hourlyForecast.precipAccumulation;
              }
            }
          });
        }
      });
      return accumulation;
    },
    snowForecast(state) {
      let accumulation = 0;
      const now = Date.now();
      const nowDateString = new Date(now).toDateString();
      Object.values(state.forecasts).forEach((forecast) => {
      // 1. get hourly snow accumulation predictions for future hours
        if (new Date(forecast.date).toDateString() === nowDateString) {
          forecast.hourly.data.forEach((hourlyForecast) => {
            if (hourlyForecast.time * 1000 > now) {
              if (hourlyForecast.precipAccumulation) {
                accumulation += hourlyForecast.precipAccumulation;
              }
            }
          });
        }
      });
      return accumulation;
    },
    snowfallAndDepthReadings(state) {
      const snowfallStations = state.snowfallReadings.map(reading => reading.Station_Id);
      const snowDepthStations = state.snowDepthReadings.map(reading => reading.Station_Id);
      const stationIds = [...snowDepthStations, ...snowfallStations];
      const allReadings = [...state.snowfallReadings, ...state.snowDepthReadings];

      const readings = stationIds.map((stationId) => {
        const snowDepth = state.snowDepthReadings.find(depth => depth.Station_Id === stationId);
        const snowfall = state.snowfallReadings.find(fall => fall.Station_Id === stationId);
        const stationData = allReadings.find(reading => reading.Station_Id === stationId);
        return {
          Station_Id: stationId,
          Name: stationData.Name,
          distanceToStation: stationData.distanceToStation,
          bearingToStation: stationData.bearingToStation,
          snowDepth,
          snowfall,
        };
      });

      return readings.sort((a, b) => a.distanceToStation - b.distanceToStation);
    },
  },
  actions: {
    updateLocation({ dispatch, commit }, { latitude, longitude }) {
      commit('setItem', { item: 'location', value: { latitude, longitude } });
      commit('setItem', { item: 'snowfallReadings', value: [] });
      commit('setItem', { item: 'snowDepthReadings', value: [] });
      commit('setItem', { item: 'forecasts', value: {} });
      commit('setItem', { item: 'loading', value: true });
      return Promise.all([
        dispatch('fetchForecasts', { numDays: 2 }),
        dispatch('fetchSnowReadings', { type: 'snowfall' }),
        dispatch('fetchSnowReadings', { type: 'snowdepth' }),
      ]).then(() => {
        commit('setItem', { item: 'loading', value: false });
        dispatch('setLocationOpen', false);
      });
    },
    fetchForecasts({ dispatch }, { numDays = 2 }) {
      const days = Array(numDays).fill().map((_, i) => {
        const today = new Date();
        return new Date().setDate(today.getDate() - i);
      });
      return Promise.all(days.map(date => dispatch('fetchForecast', { date })));
    },
    fetchForecast({ state, commit }, { date }) {
      const url = '/.netlify/functions/forecast/';
      return axios({
        url,
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
    fetchSnowReadings({ state, commit }, { type = 'snowfall' }) {
      const url = '/.netlify/functions/snowReadings/';
      return axios({
        url,
        method: 'get',
        params: {
          latitude: state.location.latitude,
          longitude: state.location.longitude,
          type,
        },
      }).then((response) => {
        const readings = response.data;
        if (type === 'snowfall') {
          commit('setItem', { item: 'snowfallReadings', value: readings });
        }
        if (type === 'snowdepth') {
          commit('setItem', { item: 'snowDepthReadings', value: readings });
        }
        return readings;
      }).catch(error => console.warn(error));
    },
    setLocationOpen({ commit }, isOpen) {
      commit('setItem', { item: 'setLocationOpen', value: isOpen });
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
