<template>
  <div class="section">
    <a @click="changeLocation = true">Change location</a>
    <form v-if="changeLocation"
          @submit.prevent="setLocation"
          class="set-location">
      <input placeholder="latitude" v-model="latitude" />
      <input placeholder="longitude" v-model="longitude" />
      <input type="submit" value="Update"/>
      <a @click="changeLocation = false">Cancel</a>
    </form>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      changeLocation: false,
      latitude: '',
      longitude: '',
    };
  },
  computed: {
    ...mapState([
      'location',
    ]),
    chartData() {
      if (!this.hourlyForecast) {
        return [];
      }
      return this.hourlyForecast.map(forecast => (forecast.precipAccumulation
        ? forecast.precipAccumulation : 0));
    },
  },
  methods: {
    setLocation() {
      this.$store.dispatch('updateLocation', { latitude: this.latitude, longitude: this.longitude });
    },
  },
};
</script>
