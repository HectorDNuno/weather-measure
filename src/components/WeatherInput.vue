<template>
  <div class="container">
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
      <button class="location-btn">Use Current Location</button>
    </div>

    <Suspense>
      <WeatherData :city="selectedCity" :weather="weatherData" />

      <template #fallback> <p>Loading...</p> </template>
    </Suspense>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { geoApiOptions, geoAPIKey } from '../api';
import { weatherAPIKey, weatherAPIUrl } from '../api';
import WeatherData from './WeatherData.vue';

const searchQuery = ref('');
const queryTimeout = ref(null);
const geoAPIResults = ref(null);
const searchError = ref(null);
const selectedCity = ref(null);
const weatherData = ref(null);

const sendData = async (searchResult) => {
  try {
    selectedCity.value = searchResult;
    searchQuery.value = '';
    searchError.value = null;
    weatherData.value = await getWeatherData();
  } catch (error) {
    console.log(error);
  }
};

const getWeatherData = async () => {
  try {
    const { latitude, longitude } = selectedCity.value;

    const weatherData = await axios.get(
      `${weatherAPIUrl}?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${weatherAPIKey}&units=imperial`
    );

    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  } catch (error) {
    console.log(error);
  }
};

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(
          `${geoAPIKey}/cities?namePrefix=${searchQuery.value}&sort=name`,
          geoApiOptions
        );

        geoAPIResults.value = result.data.data;
      } catch (error) {
        searchError.value = true;
      }
      return;
    }
    geoAPIResults.value = null;
  }, 300);
};
</script>

<style lang="css" scoped>
.container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  min-height: 495px;
}
.weather-input {
  width: 30%;
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  padding: 1rem;
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
  background: #fff;
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
  width: 26%;
  padding: 0.5rem 0.25rem;
  list-style: none;
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
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
  .container {
    flex-direction: column;
    align-items: center;
  }

  .weather-input {
    width: 100%;
  }

  .weather-input .results-list {
    width: 85%;
  }
}
</style>
