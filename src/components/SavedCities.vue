<template>
  <h2 class="title">Saved Cities</h2>
  <div class="saved-cities">
    <div v-for="city in sharedState.savedCities" :key="city.id" class="city-weather">
      <div>
        <h2>{{ city.city }}</h2>
        <h6>Temp: {{ Math.round(city.weather.currentTemp) }}&deg;F</h6>
        <h6>H: {{ Math.round(city.weather.highTemp) }}&deg;F</h6>
        <h6>L: {{ Math.round(city.weather.lowTemp) }}&deg;F</h6>
      </div>
      <i @click="removeCity(city.id)" class="fa-solid fa-circle-minus fa-2x"></i>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watchEffect } from 'vue';
import { sharedState } from '../state';
import axios from 'axios';

const url = 'https://local-weather-backend.vercel.app/';

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
          `${url}?lat=${latitude}&lon=${longitude}&exclude={part}&units=imperial`
        );

        sharedState.savedCities[index].weather = {
          currentTemp: cityWeatherData.data.current.temp,
          highTemp: cityWeatherData.data.daily[0].temp.max,
          lowTemp: cityWeatherData.data.daily[0].temp.min
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
.city-weather h6 {
  margin-top: 12px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 2px;
}

.city-weather p {
  letter-spacing: 2px;
}
.city-weather h2 {
  font-weight: 700;
  font-size: 1.7rem;
  letter-spacing: 2px;
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
