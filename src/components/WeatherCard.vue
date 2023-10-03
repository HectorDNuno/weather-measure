<template>
  <ul class="weather-cards">
    <li class="card">
      <h3>( ______ )</h3>
      <img />
      <h6>Temp: __&deg;F</h6>
      <h6>Wind: __ mph</h6>
      <h6>Humidity: __%</h6>
    </li>
  </ul>
</template>

<script setup></script>

<style lang="css" scoped>
.weather-cards {
  /* width: calc(100% / 5); */
}
.weather-cards .card {
  color: #fff;
  background: #6c757d;
  list-style: none;
  /* width: calc(100% / 5); */
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  padding: 1rem;
}
.weather-cards .card h3 {
  font-size: 1.3rem;
  font-weight: 600;
}
.weather-cards .card h6 {
  margin-top: 12px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 2px;
}
.weather-cards .card img {
  max-width: 70px;
  margin: 5px 0 -12px 0;
}
</style>
