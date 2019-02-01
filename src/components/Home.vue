<template>
  <div class="main">
    <h1>{{snowAccumulation}} inches of snow in the last 7 days</h1>
    <h2>With {{snowAccumulationForecast}} inches of snow forecast for the rest of the day</h2>
    <HourlyChart/>
  </div>
</template>

<script>
import HourlyChart from '@/components/HourlyChart.vue';
import { mapGetters } from 'vuex';

export default {
  components: { HourlyChart },
  computed: {
    ...mapGetters([
      'snowAccumulation',
      'snowAccumulationForecast',
    ]),
  },
  methods: {
    locationResponse(location) {
      this.$store.dispatch('updateLocation', location.coords)
        .then(() => this.$store.dispatch('fetchForecasts', { numDays: 7 }))
        .then(forecasts => console.log(forecasts));
    },
    locationError(error) {
      console.warn('location access denied', error);
    },
  },
  created() {
    navigator.geolocation.getCurrentPosition(
      this.locationResponse,
      this.locationError,
      { enableHighAccuracy: true },
    );
  },
};
</script>
