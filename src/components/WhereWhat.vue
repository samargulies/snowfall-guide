<template>
  <div class="wherewhat">
    <header>
      <h1 class="wherewhat-title">
        <a href="https://wherewhat.co/">
          <span class="highlight">Where</span> What
        </a>
      </h1>
      <p class="wherewhat-description">Learn more about where you are.</p>
    </header>
    <section class="site-list">
      <div class="site site--elevation" v-if="elevation">
        <a href="https://whatismyelevation.com/">
          <h2>
            <span class="highlight">What</span> is my elevation?
          </h2>
          <p>Find the altitude of your current location, or any point on Earth. When viewed from a phone that supports elevation readings, the reading will come directly from your device altitude reading and will update automatically as you move.</p>
        </a>
      </div>
      <div class="site site--address" v-if="address">
        <a href="https://whatismyelevation.com/what-is-my-address">
          <h2>
            <span class="highlight">What</span> is my address?
          </h2>
          <p>Find your current location. It also will also show you where you are via GPS (latitude and longitude), and the full address you are standing at such as the street address, county, city, state, and country. And your address will update automatically as you move so you can pinpoint exactly what you are looking for</p>
        </a>
      </div>
      <div class="site site--fast" v-if="fast">
        <a href="https://www.howfastamigoing.org/">
          <h2>
            <span class="highlight">How</span> fast am I going?
          </h2>
          <p>Find your current speed, average speed, and compass direction in miles per hour, kilometers per hour, or knots. To use this online speedometer, visit this page on a GPS enabled device and your speed will update automatically as you move.</p>
        </a>
      </div>
      <div class="site site--snow" v-if="snow">
        <a href="https://snowfall.guide/">
          <h2>
            <span class="highlight">Snow</span> Totals
          </h2>
          <p class="description">
            I built snowfall guide because I always wonder what the actual snow totals are near me after a snow storm.
            I hope you enjoy viewing the snow accumulation, snow depth, and snowfall for your recent winter storms.
          </p>
        </a>
      </div>
    </section>
    <footer class="wherewhat-footer">
      <h2>Questions?</h2>
      <p>
        Contact me at
        <a href="mailto:info@wherewhat.co">info@wherewhat.co</a>.
      </p>
    </footer>
  </div>
</template>
<script>
export default {
  props: {
    elevation: {
      type: Boolean,
      default: true,
    },
    address: {
      type: Boolean,
      default: true,
    },
    fast: {
      type: Boolean,
      default: true,
    },
    snow: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="scss">
.wherewhat {
  font-family: "clarendon-text-pro", "Superclarendon-Regular", "Rockwell",
    system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell,
    "Helvetica Neue", sans-serif;
  margin: 0 1em;
  --system: system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell,
    "Helvetica Neue", sans-serif;
  --site-brand: #fc7a24;
  --gray-text: #aaaaaa;
  --text: #000;
  a {
    color: var(--site-brand);
    border-bottom: none;
  }

  header {
    margin: 1em 0 2em 0;
  }
  .highlight {
    font-weight: 500;
    color: var(--site-brand);
  }
  .wherewhat-title {
    color: var(--text);
    font-weight: 700;
    font-size: 1.5em;
    word-spacing: -0.5ex;
    margin-bottom: 0;
    a {
      color: var(--text);
    }
    a:hover,
    a:active {
      color: var(--brand);
      .highlight {
        color: var(--brand);
      }
    }
  }
  .wherewhat-description {
    padding: 0;
    font-family: var(--system);
    color: var(--gray-text);
    font-size: 1.1em;
    font-weight: 500;
    margin-top: 0;
    text-indent: 0.4ex;
  }

  .site-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .site {
    max-width: 32rem;
    flex: 1 1 350px;
    margin: 0 1em 1em;
    text-align: left;

    &--fast {
      --site-brand: #f13a3a;
    }

    &--address {
      --site-brand: #1e86e9;
    }

    a,
    a:visited {
      display: block;
      box-sizing: border-box;
      border-top: var(--site-brand) 5px solid;
      padding: 0 0.75em 0.5em;
      transition: 0.15s ease transform, 0.15s ease box-shadow,
        0.15s ease background-color;
      backface-visibility: hidden;
      transform: translateZ(0);
      -webkit-font-smoothing: subpixel-antialiased;
      color: inherit;
      text-decoration: none;
    }

    a:hover,
    a:active {
      --site-brand: var(--brand);
      h2 {
        color: var(--site-brand);
      }
    }

    h2 {
      font-size: 1.25em;
      font-weight: 400;
      margin: 0.5em 0 0;
      color: var(--text);
    }

    p {
      margin-top: 0.5em;
      font-family: var(--system);
      line-height: 1.4;
      font-weight: 400;
    }
  }

  .wherewhat-footer {
    margin: 0 0 2em 0;
    h2 {
      font-weight: 500;
      font-size: 1.25em;
      color: var(--text);
    }
    p {
      font-family: var(--system);
    }
    a:hover,
    a:active {
      color: var(--brand);
    }
  }

  label {
    font-family: var(--system);
  }

  input,
  textarea {
    width: 100%;
    font-size: 16px;
    padding: 6px;
    font-family: var(--system);
  }

  input {
    max-width: 300px;
  }

  @media (min-width: 815px) {
    .site {
      flex-grow: 0;
    }
  }
  @mixin dark-mode {
    --text: #fff;
  }

  .color-scheme--dark & {
    @include dark-mode;
  }

  @media (prefers-color-scheme: dark) {
    .color-scheme--auto & {
      @include dark-mode;
    }
  }
}
</style>
