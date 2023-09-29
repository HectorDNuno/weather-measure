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
