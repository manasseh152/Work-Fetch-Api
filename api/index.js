const express = require('express')
const app = express()
const port = 3001

var redis = require("redis");

async function redisdb(key) {
  const client = redis.createClient();
  
  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();
  const jobs = await client.get(key);
  return jobs
}

app.get('/jobs', async (req, res) => {
  const jobs = await redisdb('adzuna')
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  return res.send(jobs)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})