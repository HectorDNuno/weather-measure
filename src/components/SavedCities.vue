<template>
  <h2 class="title">Saved Cities</h2>
  <div class="saved-cities">
    <div v-for="city in sharedState.savedCities" :key="city.id" class="city-weather">
      <div class="weather">
        <h3>{{ city.city }}</h3>
        <h1 class="temp">{{ Math.round(city.weather.currentTemp) }}&deg;F</h1>
        <img
          :src="`http://openweathermap.org/img/wn/${city.weather.icon}@2x.png`"
          alt="current weather image"
        />
        <div class="description">{{ city.weather.description }}</div>
        <div class="flex-container">
          <div class="high">H: {{ Math.round(city.weather.highTemp) }}</div>
          <div class="low">L: {{ Math.round(city.weather.lowTemp) }}</div>
        </div>
      </div>

      <i @click="removeCity(city.id)" class="fa-solid fa-circle-minus fa-2x"></i>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watchEffect } from 'vue';
import { sharedState } from '../state';
import axios from 'axios';

const url = 'https://local-weather-backend.vercel.app/weather';

const removeCity = (id) => {
  const index = sharedState.savedCities.findIndex((city) => city.id === id);

  if (index !== -1) {
    sharedState.savedCities.splice(index, 1);
  }
};

const getCityWeatherData = () => {
  try {
    watchEffect(() => {
      sharedState.savedCities.map(async (city, index) => {
        const latitude = city.coords.lat;
        const longitude = city.coords.lon;

        const cityWeatherData = await axios.get(
          `${url}?lat=${latitude}&lon=${longitude}&units=imperial`
        );

        sharedState.savedCities[index].weather = {
          currentTemp: cityWeatherData.data.main.temp,
          highTemp: cityWeatherData.data.main.temp_max,
          lowTemp: cityWeatherData.data.main.temp_min,
          icon: cityWeatherData.data.weather[0].icon,
          description: cityWeatherData.data.weather[0].main
        };
      });
    });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getCityWeatherData();
});
</script>

<style lang="css" scoped>
.saved-cities {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.title {
  margin: 1rem 0;
  letter-spacing: 2px;
}

.city-weather div .flex-container {
  display: flex;
}

.city-weather div .flex-container .high {
  margin-right: 1rem;
}

.city-weather {
  display: flex;
  justify-content: space-between;
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  padding: 1rem;
  color: #000;
  background: #c6b9ff;
}

.city-weather img {
  max-width: 5rem;
  padding-top: 1rem;
}

.city-weather .description {
  font-weight: bold;
  font-size: 1.2rem;
}

.city-weather i {
  height: min-content;
  color: #fff;
  background: #000;
  border: 3px solid #000;
  border-radius: 100%;
  box-shadow: 2px 2px 0px #000;
  cursor: pointer;
}

.city-weather i:hover {
  color: #ff4911;
}
</style>
