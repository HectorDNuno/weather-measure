<template>
  <div class="weather-data">
    <div class="current-weather">
      <div v-if="city && weather" class="info">
        <div class="details">
          <h2>
            {{ city.name + ',' }} {{ city.region === city.name ? city.country : city.region }}
          </h2>
          <h2>
            {{ city.country }}
          </h2>

          <div class="stuff">
            <div>
              <h6>
                {{
                  new Date(weather.currentTime).toLocaleDateString('en-us', {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'short'
                  })
                }}
                {{
                  new Date(weather.currentTime).toLocaleTimeString([], {
                    timeStyle: 'short'
                  })
                }}
              </h6>
              <h6>Temperature: {{ Math.round(weather.current.temp) }}&deg;F</h6>
              <h6>Wind: {{ Math.round(weather.current.wind_speed) }}mph</h6>
            </div>

            <div>
              <h6>Humidity: {{ weather.current.humidity }}%</h6>

              <h6>
                Sunrise: {{ new Date(weather.current.sunrise * 1000).getHours() }} :
                {{ new Date(weather.current.sunrise * 1000).getMinutes() }} am
              </h6>
              <h6>
                Sunset:
                {{ new Date(weather.current.sunset * 1000).getHours() - 12 }} :
                {{ new Date(weather.current.sunset * 1000).getMinutes() }} pm
              </h6>
            </div>
          </div>
        </div>

        <div class="weather-image">
          <img
            :src="`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`"
            alt=""
          />
          <p>{{ weather.current.weather[0].description }}</p>
        </div>

        <i class="fa-solid fa-circle-plus fa-2x"></i>
      </div>
    </div>

    <div class="days-forecast">
      <h2>5-day Forecast</h2>
      <ul class="weather-cards">
        <template v-if="weather">
          <li v-for="day in weather.daily.slice(1, 6)" :key="day.dt">
            <WeatherCard
              :data="{
                date: day.dt,
                day: day.feels_like.day,
                night: day.feels_like.night,
                rain: day.rain,
                img: day.weather[0].icon
              }"
            />
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';
import WeatherCard from './WeatherCard.vue';

const props = defineProps({
  city: {
    type: Object
  },
  weather: {
    type: Object
  }
});

const { city, weather } = toRefs(props);
</script>

<style lang="css" scoped>
.weather-data {
  width: 100%;
  max-width: 900px;
}
.weather-data .current-weather {
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  padding: 1rem;
  color: #fff;
  background: #3300ff;
  min-height: 230px;
}

.current-weather .info {
  display: flex;
  justify-content: space-between;
}
.current-weather h6 {
  margin-top: 12px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 2px;
}
.current-weather .details {
  cursor: pointer;
  flex: 1;
  /* text-align: center; */
}
.current-weather h2 {
  font-weight: 700;
  font-size: 1.7rem;
  letter-spacing: 2px;
}

.current-weather .weather-image {
  flex: 0.5;
  text-align: center;
  align-self: center;
}

.current-weather .info i {
  height: min-content;
  background: #000;
  border: 3px solid #000;
  border-radius: 100%;
  box-shadow: 2px 2px 0px #000;
  cursor: pointer;
}

.current-weather i:hover {
  color: #aac7fe;
}

/* forecast */
.days-forecast .weather-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
  list-style: none;
}
.days-forecast h2 {
  margin: 0.938rem 0;
  letter-spacing: 3px;
}

.stuff {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>
