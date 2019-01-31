import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  actions: {
    fetchForecast(store, { latitude, longitude }) {
      const time = Math.floor(Date.now() / 1000);
      const forecastUrl = '/.netlify/functions/forecast/';
      axios({
        url: forecastUrl,
        method: 'get',
        params: {
          latitude,
          longitude,
          time,
        },
      }).then((response) => {
        console.log(response.data);
      });
    },
  },
  mutations: {

  },
});
