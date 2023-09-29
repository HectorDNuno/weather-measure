<template>
  <div class="weather-data">
    <div class="current-weather">
      <div>
        <h2>______ (______)</h2>
        <h6>Temperature: __&deg;F</h6>
        <h6>Wind: __ mph</h6>
        <h6>Humidity: __%</h6>
      </div>

      <div>
        <img src="" alt="" />
        <p>clear sky</p>
      </div>

      <i class="fa-solid fa-circle-plus"></i>
    </div>

    <div class="days-forecast">
      <h2>5-day Forecast</h2>
      <!-- <WeatherCard /> -->
      <ul class="weather-cards">
        <li class="card">
          <h3>( ______ )</h3>
          <img />
          <h6>Temp: __&deg;F</h6>
          <h6>Wind: __ mph</h6>
          <h6>Humidity: __%</h6>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// import WeatherCard from './WeatherCard.vue'
</script>

<style lang="css" scoped>
.weather-data {
  width: 100%;
}
.weather-data .current-weather {
  color: #fff;
  background: #5372f0;
  border-radius: 5px;
  padding: 20px 70px 20px 20px;
  display: flex;
  justify-content: space-between;
}
.current-weather h2 {
  font-weight: 700;
  font-size: 1.7rem;
}
.weather-data h6 {
  margin-top: 12px;
  font-size: 1rem;
  font-weight: 500;
}
.current-weather .icon {
  text-align: center;
}
.current-weather .icon img {
  max-width: 120px;
  margin-top: -15px;
}
.current-weather .icon h6 {
  margin-top: -10px;
  text-transform: capitalize;
}

/* forecast */

.days-forecast h2 {
  margin: 20px 0;
  font-size: 1.5rem;
}

.weather-cards {
  display: flex;
  gap: 20px;
}
.weather-cards .card {
  color: #fff;
  padding: 18px 16px;
  list-style: none;
  width: calc(100% / 5);
  background: #6c757d;
  border-radius: 5px;
}
.weather-cards .card h3 {
  font-size: 1.3rem;
  font-weight: 600;
}
.weather-cards .card img {
  max-width: 70px;
  margin: 5px 0 -12px 0;
}
</style>
