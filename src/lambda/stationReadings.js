const axios = require('axios');
const turf = require('turf');

const stationSearchDistance = 10;

exports.handler = (event, context, callback) => {
  const { latitude, longitude, time } = event.queryStringParameters;
  if (!latitude || !longitude || !startDate || !endDate) {
    callback(null, { statusCode: 422, body: 'Invalid request' });
  }

  var point = turf.point([longitude, latitude]);
  var ne = turf.destination(point, stationSearchDistance, 45);
  var sw = turf.destination(point, stationSearchDistance, -135);


  // step 1: create an extent based on the location and pick the nearest station
  https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?extent=40.952134,-89.546096,44.086596,-84.479598&startdate=2019-01-26
  // step 2: get the data for that station and date range
  https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:60007&startdate=2019-01-26&enddate=2019-01-28

  const requestUrl = `https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?extent=${extentSW},${extentNE}&startdate=${startDate}`;
  const requestSettings = { headers: { token: process.env.VUE_APP_NOAA_TOKEN } };
  axios.get(requestUrl, requestSettings)
    .then((response) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response.data),
      });
    })
    .catch((error) => { callback(null, { statusCode: 422, body: String(error) }); });
};
