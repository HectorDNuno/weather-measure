<template>
  <h2 class="section-title">7-day Forecast</h2>

  <div class="cards">
    <template v-if="weather">
      <div v-for="day in weather.daily.slice(1, 8)" :key="day.dt" class="card-details">
        <h3>
          {{ new Date(day.dt * 1000).toLocaleDateString('en-us', { weekday: 'short' }) }}
          {{ new Date(day.dt * 1000).getDate() }}
        </h3>

        <img :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" />

        <h4>High: {{ Math.round(day.temp.max) }}&deg;F</h4>
        <h4>Low: {{ Math.round(day.temp.min) }}&deg;F</h4>
        <h4>Rain: {{ day.rain ? Math.round(day.rain) : 0 }}%</h4>
      </div>
    </template>
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
  grid-template-columns: repeat(7, minmax(160px, 1fr));
  gap: 2rem;

  min-height: 300px;
  padding: 1rem 1rem 5rem 0;
  overflow: auto;
}
.card-details {
  color: #000000;
  background: #f09696;
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  padding: 1rem 0;
  text-align: center;
}
</style>
