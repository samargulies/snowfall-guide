<template>
  <div class="section">
    <div v-if="location.title" class="location-name">{{location.title}}</div>
    <a @click="toggleOpen">Change location</a>
    <form v-if="setLocationOpen"
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
    ...mapState(['setLocationOpen', 'location']),
  },
  methods: {
    setLocation() {
      this.$router.push({
        name: 'location',
        params: {
          latitude: this.latitude,
          longitude: this.longitude,
        },
      });
    },
    toggleOpen() {
      this.$store.dispatch('setLocationOpen', !this.setLocationOpen);
    },
  },
};
</script>
