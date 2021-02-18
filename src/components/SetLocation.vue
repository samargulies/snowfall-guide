<template>
  <div class="section">
    <div v-if="location.title" class="location-name">{{location.title}}</div>
    <a @click="toggleOpen">Change location</a>

    <div class="set-location">

      <transition name="slide">
        <div id="location-prompt" v-if="setLocationOpen">
          <label for="address" class="visuallyhidden">Location</label>
          <div class="address-search">
            <Autocomplete
              :items="autosuggestions"
              v-model="item"
              @update-items="updateItems"
              @item-selected="setLocation"
              :get-label="getLabel"
              :component-item="template"
              :auto-select-one-item="false"
              ref="search"
              :input-attrs="{
                placeholder: 'Enter your location',
                id: 'address',
                autocomplete: 'off'
              }"
            />
            <a
              id="cancel-search"
              class="button"
              @click.prevent="toggleOpen"
            >Cancel</a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import Autocomplete from 'v-autocomplete';
import { encodeUrlTitle } from '@/helpers';
import bingMaps from '@/bingMaps';

export default {
  components: { Autocomplete },
  props: {
    route: {
      type: String,
      default: 'location',
    },
  },
  data() {
    return {
      autosuggestions: [],
      item: null,
    };
  },
  computed: {
    ...mapState(['setLocationOpen', 'location']),
    template() {
      return Vue.component('autosuggestion', {
        props: ['item'],
        template: '<span>{{ item.name }}</span>',
      });
    },
  },
  methods: {
    setLocation() {
      this.autosuggestions = [];
      if (!this.item) {
        return;
      }
      const params = {
        latitude: `${this.item.point.coordinates[0]}`,
        longitude: `${this.item.point.coordinates[1]}`,
        title: encodeUrlTitle(this.item.address.formattedAddress),
      };
      this.$router.push({
        name: this.route,
        params,
      }).catch((e) => { console.log(e); });
    },
    getLabel(item) {
      if (!item || typeof item.name !== 'string') {
        return '';
      }
      return item.name;
    },
    updateItems(query) {
      if (query.length < 3) {
        this.autosuggestions = [];
        return;
      }
      bingMaps.getAutosuggestions({
        query,
        latitude: this.$store.state.location.latitude,
        longitude: this.$store.state.location.longitude,
      }).then((results) => {
        this.autosuggestions = results;
      });
    },
    toggleOpen() {
      this.$store.dispatch('setLocationOpen', !this.setLocationOpen)
        .then(() => {
          if (this.setLocationOpen) {
            document.getElementById('address').focus();
          }
        });
    },
    toggleUnits() {
      this.$store.dispatch('setUseFeet', !this.useFeet);
    },
  },
};
</script>
