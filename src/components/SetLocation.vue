<template>
  <div class="section">
    <div v-if="location.title" class="location-name">{{location.title}}</div>
    <a @click="toggleOpen">Change location</a>
    <transition name="slide">
      <div v-if="setLocationOpen" class="set-location">
        <vue-google-autocomplete
          id="address-autocomplete"
          classname="location-input"
          types="geocode"
          placeholder="Enter your location"
          @placechanged="getAddressData"/>
        <a class="cancel" @click.prevent="toggleOpen">Cancel</a>
      </div>
    </transition>
  </div>
</template>
<script>
import { encodeUrlTitle } from '@/helpers';
import { mapState } from 'vuex';
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
  components: { VueGoogleAutocomplete },
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
    /**
    * When the location found
    * @param {Object} addressData Data of the found location
    * @param {Object} placeResultData PlaceResult object
    * @param {String} id Input container ID
    */
    getAddressData(addressData, placeResultData, id) {
      console.log({ addressData, placeResultData, id });
      this.$router.push({
        name: 'location',
        params: {
          latitude: addressData.latitude,
          longitude: addressData.longitude,
          title: encodeUrlTitle(placeResultData.formatted_address),
        },
      });
    },
    toggleOpen() {
      this.$store.dispatch('setLocationOpen', !this.setLocationOpen);
    },
  },
};
</script>
