const axios = require('axios');
const csv = require('csvtojson');
const { point, distance, bearing } = require('@turf/turf');
const { getDay, getMonth } = require('../helpers');

// return readings within this many miles
const distanceThreshold = 30;

exports.handler = (event, context, callback) => {
  const {
    latitude, longitude, time, type = 'snowfall',
  } = event.queryStringParameters;
  if (!latitude || !longitude) {
    callback(null, { statusCode: 422, body: 'Invalid request' });
  }

  let now = new Date();
  if (time) {
    now = new Date(time * 1000);
  }

  const location = point([longitude, latitude]);
  const yearMonth = `${now.getFullYear()}${getMonth(now)}`;
  const day = getDay(now);
  const url = `https://www.nohrsc.noaa.gov/nsa/discussions_text/National/${type}/${yearMonth}/${type}_${yearMonth}${day}18_e.txt`;

  axios.get(url, { responseType: 'text' })
    .then((response) => {
      const text = response.data.replace('! THESE DATA ARE UNOFFICIAL AND PROVISIONAL\n', '');
      return csv({ delimiter: '|' }).fromString(text)
        .subscribe(json => new Promise((resolve) => {
          resolve(json);
        }));
    })
    .then(readings => readings.reduce((nearbyReadings, reading) => {
      const readingPoint = point([reading.Longitude, reading.Latitude]);
      const distanceToStation = distance(location, readingPoint, { units: 'miles' });
      if (distanceToStation < distanceThreshold) {
        const bearingToStation = bearing(location, readingPoint);
        nearbyReadings.push({ ...reading, distanceToStation, bearingToStation });
      }
      return nearbyReadings;
    }, []))
    .then(readings => readings.sort((a, b) => a.distanceToReading - b.distanceToReading))
    .then(reading => reading.slice(0, 4))
    .then((data) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data),
      });
    })
    .catch((error) => { callback(null, { statusCode: 422, body: String(error) }); });
};
