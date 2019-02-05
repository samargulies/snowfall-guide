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
    <TheFooter/>
  </div>
</template>

<script>
import '@/assets/css/style.scss';
import { mapGetters, mapState } from 'vuex';
import { parseUrlTitle } from '@/helpers';
import { roundToDecimals } from '@/filters';
import SetLocation from './SetLocation.vue';
import StationReadings from './StationReadings.vue';
import TheFooter from './TheFooter.vue';

export default {
  components: { SetLocation, StationReadings, TheFooter },
  props: {
    title: { type: String },
    latitude: { type: String },
    longitude: { type: String },
  },
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
    getLocation() {
      navigator.geolocation.getCurrentPosition(
        this.routeLocation,
        this.locationError,
        { enableHighAccuracy: true },
      );
    },
    routeLocation(location) {
      this.$router.push({
        name: 'location',
        params: {
          latitude: `${location.coords.latitude}`,
          longitude: `${location.coords.longitude}`,
        },
      });
    },
    updateLocation() {
      const title = parseUrlTitle(this.title);
      document.title = document.title.replace(/.*Snowfall Guide/, `${title || ''} Snowfall Guide`);
      this.$store.dispatch('updateLocation', {
        latitude: parseFloat(this.latitude),
        longitude: parseFloat(this.longitude),
        title,
      });
    },
    locationError(error) {
      console.warn('location access denied', error);
      this.$store.commit('setItem', { item: 'loading', value: false });
      this.$store.dispatch('setLocationOpen', true);
    },
  },
  created() {
    if (this.latitude && this.longitude) {
      this.updateLocation();
    } else {
      this.getLocation();
    }
  },
  watch: {
    longitude() {
      this.updateLocation();
    },
  },
};
</script>
