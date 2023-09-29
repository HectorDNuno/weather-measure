<template>
  <div class="weather-input">
    <h3>Enter a City Name</h3>
    <input class="city-input" type="text" placeholder="E.g., New York, London, Tokyo" />
    <button class="search-btn">Search</button>
    <div class="separator"></div>
    <button class="location-btn">Use Current Location</button>
  </div>
</template>

<script setup></script>

<style lang="css" scoped>
.weather-input {
  width: 50%;
}
.weather-input input {
  height: 46px;
  width: 100%;
  outline: none;
  font-size: 1.07rem;
  padding: 0 17px;
  margin: 10px 0 20px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.weather-input input:focus {
  /* padding: 0 16px; */
  border: 2px solid #5372f0;
}
.weather-input .separator {
  height: 1px;
  width: 100%;
  margin: 25px 0;
  background: #bbbbbb;
  display: flex;
  align-items: center;
  justify-content: center;
}
.weather-input .separator::before {
  content: "or";
  color: #6c757d;
  font-size: 1.18rem;
  padding: 0 15px;
  margin-top: -4px;
  background: #fff;
}
.weather-input button {
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: #fff;
  background: #5372f0;
  transition: 0.2s ease;
}
.weather-input .search-btn:hover {
  background: #2c52ed;
}
.weather-input .location-btn {
  background: #6c757d;
}
.weather-input .location-btn:hover {
  background: #5c636a;
}
</style>
