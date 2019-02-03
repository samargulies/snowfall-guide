<template>
  <div class="section">
    <a @click="toggleOpen">Change location</a>
    <form v-if="open"
          @submit.prevent="setLocation"
          class="set-location">
      <input placeholder="latitude" v-model="latitude" />
      <input placeholder="longitude" v-model="longitude" />
      <input type="submit" value="Update"/>
      <button @click="toggleOpen">Cancel</button>
    </form>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      latitude: '',
      longitude: '',
    };
  },
  computed: {
    ...mapState(['setLocationOpen']),
  },
  methods: {
    setLocation() {
      this.$store.dispatch('updateLocation', { latitude: this.latitude, longitude: this.longitude });
    },
    toggleOpen() {
      this.$store.dispatch('setLocationOpen', !this.setLocationOpen);
    },
  },
};
</script>
