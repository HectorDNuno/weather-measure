<template>
  <div class="weather-data-container">
    <div v-if="city && weather" class="weather-info">
      <div class="location">
        <div>
          <h2>
            {{ city.name + ',' }} {{ city.region === city.name ? city.country : city.region }}
          </h2>
          <h2>
            {{ city.country }}
          </h2>
        </div>

        <i class="fa-solid fa-circle-plus fa-2x"></i>
      </div>

      <div class="weather-details">
        <div>
          <h6>
            {{
              new Date(weather.currentTime).toLocaleDateString('en-us', {
                weekday: 'short',
                day: '2-digit',
                month: 'short'
              })
            }}
            {{ updateTime() }}
          </h6>
          <h6>Temperature: {{ Math.round(weather.current.temp) }}&deg;F</h6>
          <h6>Humidity: {{ weather.current.humidity }}%</h6>
        </div>

        <div>
          <h6>High: {{ Math.round(weather.daily[0].temp.max) }}&deg;F</h6>
          <h6>Low: {{ Math.round(weather.daily[0].temp.min) }}&deg;F</h6>
          <h6>Wind: {{ Math.round(weather.current.wind_speed) }}mph</h6>
        </div>

        <div class="weather-image">
          <img
            :src="`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`"
            alt=""
          />
          <p>{{ weather.current.weather[0].description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, ref } from 'vue';

const props = defineProps({
  city: {
    type: Object
  },
  weather: {
    type: Object
  }
});

const { city, weather } = toRefs(props);

const currentTime = ref(null);

const updateTime = () => {
  const timezone = weather.value.timezone;
  const timeStamp = weather.value.currentTime;
  const timeNow = new Date();
  const timeDifference = timeNow - timeStamp;

  const updatedTime = new Date(timeStamp + timeDifference).toLocaleTimeString([], {
    timeZone: timezone,
    timeStyle: 'short'
  });

  currentTime.value = updatedTime;

  setTimeout(updateTime, 10000);
  return currentTime.value;
};
</script>

<style lang="css" scoped>
.weather-data-container {
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  padding: 1rem;
  color: #fff;
  background: #3300ff;
  min-height: 240px;
}

.weather-info .location {
  display: flex;
  justify-content: space-between;
}
.weather-data-container h6 {
  margin-top: 12px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 2px;
}
.weather-data-container h2 {
  font-weight: 700;
  font-size: 1.7rem;
  letter-spacing: 2px;
}
.weather-info .weather-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  cursor: pointer;
}

.weather-details .weather-image {
  text-align: center;
}

.location i {
  height: min-content;
  background: #000;
  border: 3px solid #000;
  border-radius: 100%;
  box-shadow: 2px 2px 0px #000;
  cursor: pointer;
}

.location i:hover {
  color: #aac7fe;
}

@media (max-width: 1265px) {
  .weather-data {
    max-width: none;
  }

  .days-forecast .weather-cards {
    grid-auto-flow: row;
  }
}
</style>
