import axios from 'axios';

const apiUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/37.8267,-122.4233`;

exports.handler = async (event, context) => axios.get(apiUrl)
  .then(response => ({
    statusCode: 200,
    body: JSON.stringify(response.data),
  }))
  .catch(error => ({ statusCode: 422, body: String(error) }));
