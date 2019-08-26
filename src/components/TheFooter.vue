<template>
<div>
  <div class="section section--about">
    <h2 class="section__title">What is this?</h2>
    <!-- eslint-disable-next-line max-len -->
    <p>I built snowfall guide because I always wonder what the actual snow totals are near me after a snow storm. I hope you enjoy viewing the snow accumulation, snow depth, and snowfall for your recent winter storms.</p>
    <p><a href="https://darksky.net/poweredby/">Powered by Dark Sky</a> and the <a href="https://www.nohrsc.noaa.gov">National Weather Service NOHRSC</a>.</p>
    <p>Brought to you by <a href="https://belabor.org">belabor.org</a>.</p>
  </div>
  <div class="section section--navigation">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/atlas">Atlas</router-link></li>
        <li><a href="https://www.whatismyelevation.com/">What is my elevation?</a></li>
        <li><a href="http://howfastamigoing.org">How fast am I going?</a></li>
        <li><a href="http://visited.earth/">Visited Earth</a></li>
      </ul>
    </nav>
  </div>
</div>
</template>
