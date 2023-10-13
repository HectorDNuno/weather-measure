<template>
  <div class="forecast-container">
    <h2 class="section-title">7-day Forecast</h2>

    <ul class="cards">
      <template v-if="weather">
        <li v-for="day in weather.daily.slice(1, 8)" :key="day.dt" class="card-details">
          <h3>
            {{ new Date(day.dt * 1000).toLocaleDateString('en-us', { weekday: 'short' }) }}
            {{ new Date(day.dt * 1000).getDate() }}
          </h3>

          <img :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" />

          <h4>High: {{ Math.round(day.temp.max) }}&deg;F</h4>
          <h4>Low: {{ Math.round(day.temp.min) }}&deg;F</h4>
          <h4>Rain: {{ day.rain ? Math.round(day.rain) : 0 }}%</h4>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  weather: {
    type: Object
  }
});
</script>

<style lang="css" scoped>
.forecast-container {
  /* min-height: 250px; */
}

.forecast-container .section-title {
  letter-spacing: 3px;
  /* margin-bottom: 1rem; */
}

.forecast-container h4 {
  margin-top: 5px;
  font-weight: 500;
  letter-spacing: 2px;
}
.forecast-container img {
  max-width: 4.3rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
  grid-auto-flow: column;
  grid-auto-columns: minmax(160px, 1fr);
  column-gap: 20px;

  min-height: 240px;
  padding: 0 1rem 1rem 0;
  list-style: none;
  overflow-x: auto;
}

.card-details {
  color: #fff;
  background: #6c757d;
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  padding: 1rem;
  text-align: center;
}
</style>
