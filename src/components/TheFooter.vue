<template>
<footer class="footer">
  <div class="section section--about">
    <h2 class="section__title">What is this?</h2>
    <!-- eslint-disable-next-line max-len -->
    <p>I built this snowfall guide because I always wonder what the actual snow totals are near me after a snow storm. You can view the snow accumulation, snow depth, and snowfall for your recent winter storms as well as nearby snow reports from weather stations across the country.</p>
    <p><a href="https://darksky.net/poweredby/">Powered by Dark Sky</a> and the <a href="https://www.nohrsc.noaa.gov">National Weather Service NOHRSC</a>.</p>
  </div>
  <div class="section section--navigation">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/atlas">Atlas</router-link></li>
      </ul>
    </nav>
  </div>
  <WhereWhat :snow="false" />
</footer>
</template>
<script>
import WhereWhat from '@/components/WhereWhat.vue';

export default {
  components: { WhereWhat },
};
</script>
