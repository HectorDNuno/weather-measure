const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const weatherAPIUrl = 'https://api.openweathermap.org/data/2.5/onecall';
const weatherAPIKey = process.env.WEATHER_API_KEY;
const geoAPIKey = process.env.GEO_API_KEY;

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://mellow-beignet-bd99f1.netlify.app/'],
    default: 'http://localhost:5173'
  })
);

app.all('*', (req, res, next) => {
  const origin = cors.origin.includes(req.header('origin').toLowerCase())
    ? req.headers.origin
    : cors.default;
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.json('local weather backend');
});

app.get('/search', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
      headers: {
        'X-RapidAPI-Key': geoAPIKey,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    };

    const response = await axios.get(options.url, { params: req.query, ...options });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/weather', async (req, res) => {
  try {
    const response = await axios.get(weatherAPIUrl, {
      params: { ...req.query, appid: weatherAPIKey }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/location', async (req, res) => {
  try {
    const combinedCoordinates = req.query.lat + req.query.lon;

    const options = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/places',
      params: {
        location: combinedCoordinates
      },
      headers: {
        'X-RapidAPI-Key': geoAPIKey,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    };

    const response = await axios.get(options.url, options);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
