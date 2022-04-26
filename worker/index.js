const fetchAdzuna = require('./tasks/fetch-adzuna')

console.log('starting server...')
var cron = require('node-cron');

cron.schedule('* * * * *', () => {
  console.log('Fetch adzuna');
  fetchAdzuna();
});