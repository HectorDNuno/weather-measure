const port = 3000;
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const qs = require('qs');

const weatherAPIUrl = 'https://api.openweathermap.org/data/2.5/onecall';
const weatherAPIKey = process.env.WEATHER_API_KEY;
const geoAPIKey = process.env.GEO_API_KEY;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cors());

app.get('/', (req, res) => {
  res.json('hi');
});

app.get('/search', (req, res) => {
  const geoApiOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': geoAPIKey,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };

  const geoAPIUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

  let query = req.query;
  let queryString = qs.stringify(query);

  axios(`${geoAPIUrl}?${queryString}`, geoApiOptions)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get('/weather', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/html');

  let query = req.query;
  query.appid = weatherAPIKey;
  let queryString = qs.stringify(query);

  axios(`${weatherAPIUrl}?${queryString}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
