require('dotenv').config();
const express = require('express');
const app = express();
const qs = require('qs');
const axios = require('axios');
const port = 3000;

const weatherAPIUrl = 'https://api.openweathermap.org/data/2.5/onecall';
const weatherAPIKey = process.env.WEATHER_API_KEY;

app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/html');

  let query = req.query;
  query.appid = weatherAPIKey;
  let queryString = qs.stringify(query);

  axios(`${weatherAPIUrl}?${queryString}`).then((response) => {
    res.send(response.data);
  });

  res.send('backend is wokring');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
