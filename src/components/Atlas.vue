<template>
  <div class="main">
    <div class="section section--atlas">
      <h1 class="section__title">Snowfall Guide: Atlas</h1>
      <div v-for="state in states" :key="state" class="state">
        <h2 class="state__name">{{state}}</h2>
        <div class="state__cities">
          <div v-for="city in citiesByState(state)" :key="city.city" class="city">
              <router-link :to="{name: 'location', params: {
                  latitude: `${city.latitude}`,
                  longitude: `${city.longitude}`,
                  title: cityNameUrl(city),
                }}">
                  {{city.city}}
                </router-link>
          </div>
        </div>
      </div>
    </div>
    <TheFooter/>
  </div>
</template>

<script>
import '@/assets/css/style.scss';
import cities from '@/data/cities.json';
import { parseUrlTitle } from '@/helpers';
import TheFooter from './TheFooter.vue';

export default {
  components: { TheFooter },
  data() {
    return {
      cities,
    };
  },
  computed: {
    states() {
      return [...new Set(this.cities.map((city) => city.state))].sort();
    },
  },
  methods: {
    citiesByState(state) {
      return this.cities.filter((city) => city.state === state).sort();
    },
    cityNameUrl(city) {
      return parseUrlTitle(`${city.city}, ${city.state}`);
    },
  },
};
</script>
