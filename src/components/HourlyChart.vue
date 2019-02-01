<template>
    <vue-frappe
            id="test"
            type="axis-mixed"
            :height="300"
            :colors="['purple', '#ffa3ef', 'light-blue']"
            :dataSets="dataSets">
        </vue-frappe>
</template>
<script>
import { mapGetters } from 'vuex';
import Vue from 'vue';
import Chart from 'vue2-frappe';

Vue.use(Chart);

export default {
  computed: {
    ...mapGetters([
      'hourlyForecast',
    ]),
    data() {
      return this.hourlyForecast.map(forecast => (forecast.precipType === 'snow' ? forecast.precipAccumulation : 0));
    },
    dataSets() {
      return [{
        name: 'Some Data',
        chartType: 'bar',
        values: this.data ? this.data : [],
      }];
    },
  },
};
</script>
