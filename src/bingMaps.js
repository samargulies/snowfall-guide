import jsonp from 'jsonp';

const baseUrl = 'https://dev.virtualearth.net/REST/v1';
const keys = process.env.VUE_APP_BING_API_KEYS.split(',');

function getKey() {
  return keys[Math.floor(Math.random() * keys.length)];
}

function getLocation({ latitude, longitude, lang = 'en-US' }) {
  const key = getKey();
  const url = `${baseUrl}/Locations/${latitude},${longitude}?key=${key}&inclnb=1&culture=${lang}`;
  return new Promise((resolve, reject) => {
    jsonp(url, { param: 'jsonp' }, (error, data) => {
      if (error) {
        console.error(error.message);
        reject(error);
      } else {
        // console.log(data.resourceSets[0].resources[0]);
        resolve(data.resourceSets[0].resources[0].address);
      }
    });
  });
}

function getElevation({ latitude, longitude }) {
  const key = getKey();
  const url = `${baseUrl}/Elevation/List/?key=${key}&points=${latitude},${longitude}`;
  return new Promise((resolve, reject) => {
    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      reject(Error('NaN'));
    }
    jsonp(url, { param: 'jsonp' }, (error, data) => {
      if (error) {
        console.error(error.message);
        reject(error);
      } else {
        if (typeof data.resourceSets === 'undefined' || data.resourceSets.length < 1) {
          reject(Error('no resourceSets found'));
          return;
        }
        const resourceSet = data.resourceSets[0];
        if (typeof resourceSet.resources === 'undefined' || resourceSet.resources.length < 1) {
          reject(Error('no resources found'));
          return;
        }
        const resources = resourceSet.resources[0];
        if (typeof resources.elevations === 'undefined' || resources.elevations.length < 1) {
          reject(Error('no elevations found'));
          return;
        }
        resolve(resources.elevations[0]);
      }
    });
  });
}

function getLocations({ query, lang = 'en-US' }) {
  const key = getKey();
  const url = `${baseUrl}/Autosuggest/?key=${key}&query=${query}&culture=${lang}`;
  return new Promise((resolve, reject) => {
    jsonp(url, { param: 'jsonp' }, (error, data) => {
      if (error) {
        console.error(error.message);
        reject(error);
      } else {
        // console.log(data);
        resolve(data.resourceSets[0].resources);
      }
    });
  });
}

function getAutosuggestions({
  query, latitude = null, longitude = null, lang = 'en-US',
}) {
  const key = getKey();
  let location = '';
  if (latitude !== null && longitude !== null) {
    location = `&${latitude},${longitude}`;
  }
  const url = `${baseUrl}/Locations/?key=${key}&query=${query}&culture=${lang}${location}`;

  return new Promise((resolve, reject) => {
    jsonp(url, { param: 'jsonp' }, (error, data) => {
      if (error) {
        console.error(error.message);
        reject(error);
      } else {
        // console.log(data);
        resolve(data.resourceSets[0].resources);
      }
    });
  });
}

export default {
  getElevation, getLocation, getLocations, getAutosuggestions,
};
