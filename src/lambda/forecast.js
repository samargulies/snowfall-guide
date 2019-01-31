const axios = require('axios');

// export function handler(event, context, callback) {
//   console.log(event);
//   callback(null, {
//     statusCode: 200,
//     body: JSON.stringify(process.env.VUE_APP_DARK_SKY),
//   });


exports.handler = (event, context, callback) => {
  const { latitude, longitude, time } = event.queryStringParameters;
  if (!latitude || !longitude || !time) {
    callback(null, { statusCode: 422, body: 'Invalid request' });
  }
  const requestUrl = `https://api.darksky.net/forecast/${process.env.VUE_APP_DARK_SKY_KEY}/${latitude},${longitude},${time}`;

  axios.get(requestUrl)
    .then((response) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response.data),
      });
    })
    .catch((error) => { callback(null, { statusCode: 422, body: String(error) }); });
};
