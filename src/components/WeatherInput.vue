<template>
  <div class="weather-container">
    <div class="weather-input">
      <h2>Enter a City Name</h2>

      <input
        v-model="searchQuery"
        @input="getSearchResults"
        type="text"
        placeholder="E.g., New York, London, Tokyo"
        class="city-input"
      />

      <ul v-if="geoAPIResults && searchQuery !== ''" class="results-list">
        <p v-if="searchError" class="list-item">Sorry, something went wrong. Please try again.</p>

        <p v-if="!searchError && geoAPIResults.length === 0" class="list-item">No results</p>

        <template v-else>
          <li
            v-for="searchResult in geoAPIResults"
            :key="searchResult.id"
            @click="sendData(searchResult)"
            class="list-item"
          >
            {{ `${searchResult.city}, ${searchResult.region}, ${searchResult.countryCode}` }}
          </li>
        </template>
      </ul>

      <div class="separator"></div>
      <button @click="getLocation" class="location-btn">Use Current Location</button>
    </div>

    <div class="weather-data">
      <Suspense>
        <CityWeather :city="selectedCity" :weather="weatherData" />
        <template #fallback> <p>Loading...</p> </template>
      </Suspense>
    </div>

    <!-- <div class="forecast">
      <Suspense>
        <CityForecast :weather="weatherData" />
        <template #fallback> <p>Loading...</p> </template>
      </Suspense>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import CityWeather from './CityWeather.vue';
// import CityForecast from './CityForecast.vue';

const searchQuery = ref('');
const queryTimeout = ref(null);
const geoAPIResults = ref(null);
const searchError = ref(null);
const selectedCity = ref(null);
const weatherData = ref(null);

const sendData = async (city) => {
  try {
    selectedCity.value = city;
    searchQuery.value = '';
    searchError.value = null;
    weatherData.value = await getWeatherData();
  } catch (error) {
    console.log(error);
  }
};

const getWeatherData = async () => {
  try {
    // const url = 'https://local-weather-backend.vercel.app/weather';
    const url = 'http://localhost:3000/weather';
    const { latitude, longitude } = selectedCity.value;

    const weatherData = await axios.get(`${url}?lat=${latitude}&lon=${longitude}&units=imperial`);

    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.dt * 1000 + localOffset;
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone;
    console.log(weatherData.data);
    return weatherData.data;
  } catch (error) {
    console.log(error);
  }
};

const getSearchResults = () => {
  // const url = 'https://local-weather-backend.vercel.app/search';
  const url = 'http://localhost:3000/search';

  clearTimeout(queryTimeout.value);

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(`${url}?namePrefix=${searchQuery.value}&sort=name`);

        geoAPIResults.value = result.data.data;
      } catch (error) {
        searchError.value = true;
      }
      return;
    }
    geoAPIResults.value = null;
  }, 300);
};

const getLocation = () => {
  let message = '';

  const success = async (position) => {
    try {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // const url = 'https://local-weather-backend.vercel.app/location';
      const url = 'http://localhost:3000/location';

      const location = await axios.get(`${url}?lat=${latitude}&lon=${longitude}`);

      location.data.data[0].city = location.data.data[0].name;

      sendData(location.data.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const error = () => {
    message = 'Unable to retrieve your location';
    console.log(message);
  };

  if (!navigator.geolocation) {
    message = 'geolocation is not supported by your browser';
    console.log(message);
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
};
</script>

<style lang="css" scoped>
.weather-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  max-width: 1500px;
  column-gap: 2rem;
}

.weather-input {
  padding: 1rem;
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  max-height: 240px;
  background-color: #fec700;
}

.weather-data {
  grid-column: 2 / span 2;
}

.forecast {
  grid-column: 1 / span 3;
}

.weather-input h2 {
  letter-spacing: 3px;
}
.weather-input input {
  height: 2.8rem;
  width: 100%;
  outline: none;
  font-size: 1.07rem;
  letter-spacing: 2px;
  padding: 0 17px;
  margin: 10px 0 20px 0;
  border-radius: 10px;
  border: 3px solid #000;
}
.weather-input input:focus {
  border: 2px solid #3300ff;
}
.weather-input .separator {
  height: 5px;
  border-radius: 10px;
  width: 100%;
  margin: 25px 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.weather-input .separator::before {
  content: 'or';
  color: #000;
  font-size: 1.18rem;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 0 15px;
  margin-top: -4px;
  background: #fec700;
}
.weather-input button {
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  outline: none;
  border: 3px solid #000;
  border-radius: 10px;
  font-size: 1rem;
  letter-spacing: 2px;
  color: #fff;
  background: #3300ff;
  transition: 0.2s ease;
}
.weather-input .search-btn:hover {
  background: #4185f4;
}
.weather-input .location-btn {
  background: #aac7fe;
}
.weather-input .location-btn:hover {
  background: #3300ff;
}

.weather-input .results-list {
  position: absolute;
  top: 195px;
  background-color: #fff;
  color: #000;
  width: 27.5%;
  padding: 0.5rem 0.25rem;
  list-style: none;
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  z-index: 2;
}

.results-list .list-item {
  padding: 1rem;
  border-radius: 10px;
  color: #000;
  letter-spacing: 2px;
  cursor: pointer;
}

.results-list .list-item:hover {
  background: #3300ff;
  color: #fff;
}

@media (max-width: 1265px) {
  .weather-container {
    grid-template-columns: repeat(1, minmax(300px, 650px));
    row-gap: 2rem;
  }

  .weather-input,
  .weather-data,
  .forecast {
    grid-area: auto;
  }
  .weather-input .results-list {
    width: 80%;
  }
}
</style>
