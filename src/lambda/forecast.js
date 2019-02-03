const axios = require('axios');

const darkSkyKey = process.env.VUE_APP_DARK_SKY_KEY;

exports.handler = (event, context, callback) => {
  const { latitude, longitude, time } = event.queryStringParameters;
  if (!latitude || !longitude || !time) {
    callback(null, { statusCode: 422, body: 'Invalid request' });
  }

  axios({
    url: `https://api.darksky.net/forecast/${darkSkyKey}/${latitude},${longitude},${time}`,
    method: 'get',
    params: {
      exclude: 'alerts,minutely',
    },
  })
    .then((response) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response.data),
      });
    })
    .catch((error) => { callback(null, { statusCode: 422, body: String(error) }); });
};
