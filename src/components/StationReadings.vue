<template>
    <div class="section">
      <h1 class="section__title">Nearby Station Readings</h1>
      <div v-if="snowfallAndDepthReadings.length > 0" class="station-readings">
        <div class="station-reading"
              v-for="reading in snowfallAndDepthReadings"
              :key="reading.Station_Id">
          <div v-if="reading.snowfall" class="station-reading__snowfall">
            <span class="quantity">
              {{reading.snowfall.Amount | roundToDecimals(1)}} {{reading.snowfall.Amount_Units}}
            </span>
            snow over {{reading.snowfall.Duration | roundToDecimals(0)}}
            {{reading.snowfall.Duration_Units}}
          </div>
          <div v-if="reading.snowDepth" class="station-reading__snowdepth">
            <span class="quantity">
              {{reading.snowDepth.Amount | roundToDecimals(1)}} {{reading.snowDepth.Units}}
            </span>
            snow depth
          </div>
          <div class="station-reading__location">{{reading.Name}}</div>
          <div class="station-reading__distance">
            {{reading.distanceToStation | roundToDecimals(0)}} miles
            {{reading.bearingToStation | bearing}}
            </div>
        </div>
      </div>
      <div v-else class="station-readings no-readings">
        <p>No station readings found nearby</p>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { bearing, roundToDecimals } from '@/filters';

export default {
  filters: {
    bearing, roundToDecimals,
  },
  computed: {
    ...mapGetters([
      'snowfallAndDepthReadings',
    ]),
  },
};
</script>
