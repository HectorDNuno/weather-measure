<template>
  <h2 class="section-title">5-day Forecast</h2>
  <div class="cards">
    <template v-if="forecast">
      <div v-for="day in formatForecast()" :key="day.dt" class="card-details">
        <h3>
          {{ new Date(day.dt * 1000).toLocaleDateString('en-us', { weekday: 'short' }) }}
          {{ new Date(day.dt * 1000).getDate() }}
        </h3>

        <img :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" />

        <h4>High: {{ Math.round(day.main.temp_max) }}&deg;F</h4>
        <h4>Low: {{ Math.round(day.main.temp_min) }}&deg;F</h4>
        <h4>{{ day.weather[0].description }}</h4>
      </div>
    </template>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  forecast: {
    type: Object
  }
});

const { forecast } = toRefs(props);

const formatForecast = () => {
  const forecastArray = forecast.value.list;
  const fiveDayForecast = [];
  const seenDates = [];

  forecastArray.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];

    if (!seenDates.includes(date)) {
      seenDates.push(date);
      fiveDayForecast.push(item);
    }
  });

  return fiveDayForecast.slice(1);
};
</script>

<style lang="css" scoped>
.section-title {
  margin-top: 2rem;
  letter-spacing: 2px;
}

h4 {
  font-weight: 500;
  letter-spacing: 2px;
}
img {
  max-width: 5rem;
  margin: 0 auto;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 2rem;

  min-height: 300px;
  padding: 1rem 0;
}
.card-details {
  color: #000000;
  background: #f09696;
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  padding: 3rem 0;
  text-align: center;
  font-size: 1.2rem;
}
</style>
