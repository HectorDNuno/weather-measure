<template>
  <div class="weather-data-container">
    <div v-if="city && weather" class="weather-info">
      <div class="location">
        <h2>{{ city.name + ',' }} {{ city.region === city.name ? city.country : city.region }}</h2>
        <i @click="addCity" class="fa-solid fa-circle-plus fa-2x"> </i>
      </div>

      <div class="weather-details">
        <h6 class="temperature">Temperature: {{ Math.round(weather.main.temp) }}&deg;F</h6>
        <h6 class="high">High: {{ Math.round(weather.main.temp_max) }}&deg;F</h6>
        <h6 class="low">Low: {{ Math.round(weather.main.temp_min) }}&deg;F</h6>
        <h6 class="humidity">Humidity: {{ weather.main.humidity }}%</h6>
        <h6 class="wind">Wind: {{ Math.round(weather.wind.speed) }}mph</h6>
        <h6 class="clouds">Clouds: {{ weather.clouds.all }}%</h6>

        <div class="weather-image">
          <img
            :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
            alt="current weather image"
          />
          <p>{{ weather.weather[0].description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';
import { sharedState } from '../state';

const props = defineProps({
  city: {
    type: Object
  },
  weather: {
    type: Object
  }
});

const { city, weather } = toRefs(props);

const addCity = () => {
  if (sharedState.savedCities.some((savedCity) => savedCity.city === city.value.name)) {
    return;
  } else if (sharedState.savedCities.length === 4) {
    return;
  } else {
    const locaitonObj = {
      id: city.value.id,
      city: city.value.name,
      region: city.value.region,
      country: city.value.country,
      coords: {
        lat: city.value.latitude,
        lon: city.value.longitude
      },
      weather: {}
    };

    sharedState.savedCities.push(locaitonObj);
  }
};
</script>

<style lang="css" scoped>
.weather-data-container {
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  padding: 1.5rem;
  background: #6ad69d;
  min-height: 240px;
}

.weather-info .location {
  display: flex;
  justify-content: space-between;
  color: #000;
}
.weather-info .location i {
  color: #fff;
}
.weather-data-container h6 {
  margin-top: 12px;
  font-size: 1rem;
  letter-spacing: 2px;
}
.weather-data-container h2 {
  font-size: 1.7rem;
  letter-spacing: 2px;
}
.weather-info .weather-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 1rem;
}

.weather-details .weather-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-column: 3;
  grid-row: 1 / span 3;
}

.temperature {
  grid-row: 1;
}

.high {
  grid-row: 2;
}

.low {
  grid-column: 1;
  grid-row: 3;
}

.humidity {
  grid-row: 2;
}

.clouds {
  grid-row: 1;
}

.wind {
  grid-column: 2;
  grid-row: 3;
}

.weather-image img {
  max-width: 7rem;
}

.weather-image p {
  font-weight: 600;
  letter-spacing: 2px;
}

.location {
  position: relative;
}

.location i {
  height: min-content;
  background: #000;
  border: 3px solid #000;
  border-radius: 100%;
  box-shadow: 2px 2px 0px #000;
  cursor: pointer;
  z-index: 1;
}

.location i:hover {
  color: #ffff00;
}

.location .message {
  position: absolute;
  right: 0.2rem;
  bottom: 2.2rem;
  background-color: #fff;
  border: 3px solid #000;
  border-radius: 500px;
  box-shadow: 2px 2px 0px #000;
  padding: 0.5rem 3rem 0.5rem 0.5rem;
}

@media (max-width: 1265px) {
  .weather-data {
    max-width: none;
  }

  .days-forecast .weather-cards {
    grid-auto-flow: row;
  }
}

@media (max-width: 500px) {
  .weather-data-container {
    min-height: 410px;
  }

  .weather-info .weather-details {
    text-align: center;
    margin-top: 1rem;
  }

  .temperature {
    grid-column: 1 / span 3;
    grid-row: 2;
  }
  .humidity {
    grid-column: 1 / span 3;
    grid-row: 3;
  }

  .high {
    grid-column: 1 / span 3;
    grid-row: 6;
  }

  .low {
    grid-column: 1 / span 3;
    grid-row: 4;
  }

  .wind {
    grid-column: 1 / span 3;
    grid-row: 5;
  }

  .weather-details .weather-image {
    grid-column: 1 / span 3;
    grid-row: 7;
  }

  .weather-image img {
    max-width: 7rem;
  }

  .weather-image p {
    font-weight: 600;
    letter-spacing: 2px;
  }

  .location {
    position: relative;
  }
}
</style>
