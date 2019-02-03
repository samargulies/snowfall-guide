<template>
  <div class="main">
    <div class="section">
      <h1 class="section__title">Snowfall Guide</h1>
      <div v-if="!loading" class="topline-readings">
        <div class="reading">
          <div class="reading__value">{{snowDepth | roundToDecimals(1)}} in</div>
          <div class="reading__label">Snow depth</div>
        </div>
        <div class="reading main-reading">
          <div class="reading__value">{{snowAccumulation | roundToDecimals(1)}} in</div>
          <div class="reading__label">In the last 24 hours</div>
        </div>
        <div class="reading">
          <div class="reading__value">{{snowForecast | roundToDecimals(0)}} in</div>
          <div class="reading__label">Forecast today</div>
        </div>
      </div>
       <div v-else class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>
    <SetLocation/>
    <StationReadings v-if="!loading"/>
    <div class="section section--about">
      <h2 class="section__title">What is this?</h2>
      <!-- eslint-disable-next-line max-len -->
      <p>I built snowfall guide because after a snow storm is forecast I always wonder what the actual snow totals are near me. This site uses a combination of NOAA station readings in the U.S. and Dark Sky for forecasts and snowfall estimates. I hope you enjoy viewing the snow accumulation, snow depth, and snowfall for your recent winter storms.</p>
    </div>
  </div>
</template>

<script>
import '@/assets/css/style.scss';
import { mapGetters, mapState } from 'vuex';
import { roundToDecimals } from '@/filters';
import SetLocation from './SetLocation.vue';
import StationReadings from './StationReadings.vue';

export default {
  components: { SetLocation, StationReadings },
  filters: {
    roundToDecimals,
  },
  computed: {
    ...mapGetters([
      'snowDepth',
      'snowAccumulation',
      'snowForecast',
      'hourlyForecast',
    ]),
    ...mapState(['loading']),
    chartData() {
      if (!this.hourlyForecast) {
        return [];
      }
      return this.hourlyForecast.map(forecast => (forecast.precipAccumulation
        ? forecast.precipAccumulation : 0));
    },
  },
  methods: {
    locationResponse(location) {
      this.$store.dispatch('updateLocation', location.coords);
    },
    locationError(error) {
      console.warn('location access denied', error);
      this.$store.commit('setItem', { item: 'loading', value: false });
      this.$store.dispatch('setLocationOpen', true);
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
