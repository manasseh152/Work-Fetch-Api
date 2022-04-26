const axios = require('axios');
var redis = require("redis");

const config = {
  APP_ID: '242be52f',
  API_KEY: '9ed7c98f3c01ade0cdc645009e3a5d19',
  BASE_URL: 'https://api.adzuna.com/v1/api/jobs',
  BASE_PARAMS: 'search/1?&results_per_page=90&content-type=application/json',
};

function targetURL(country = 'gb', what = 'developer', where = 'london') {
  return `${config.BASE_URL}/${country}/${config.BASE_PARAMS}&app_id=${config.APP_ID}&app_key=${config.API_KEY}&what=${what}&where=${where}`
}

async function redisdb(key, value) {
  const client = redis.createClient();
  
  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();
  await client.set(key, value);
}

function fetchAdzuna() {
  axios.get(targetURL())
  .then(res => {
    console.log('status:',res.status);
    redisdb('adzuna',JSON.stringify(res.data));
  })
  .catch(res => {
    console.log(res);
  })
}

module.exports = fetchAdzuna;