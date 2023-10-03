<template>
  <div class="weather-input">
    <h2>Enter a City Name</h2>
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
  max-width: 500px;
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  padding: 1rem;
}
.weather-input h2 {
  letter-spacing: 3px;
}
.weather-input input {
  height: 46px;
  width: 100%;
  outline: none;
  font-size: 1.07rem;
  letter-spacing: 2px;
  padding: 0 17px;
  margin: 10px 0 20px 0;
  border-radius: 10px;
  border: 3px solid #000;
}
.weather-input input:focus {
  /* padding: 0 16px; */
  border: 2px solid #3300ff;
}
.weather-input .separator {
  height: 5px;
  border-radius: 10px;
  width: 100%;
  margin: 25px 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.weather-input .separator::before {
  content: 'or';
  color: #000;
  font-size: 1.18rem;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 0 15px;
  margin-top: -4px;
  background: #fff;
}
.weather-input button {
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  outline: none;
  border: 3px solid #000;
  border-radius: 10px;
  font-size: 1rem;
  letter-spacing: 2px;
  color: #fff;
  background: #3300ff;
  transition: 0.2s ease;
}
.weather-input .search-btn:hover {
  background: #4185f4;
}
.weather-input .location-btn {
  background: #aac7fe;
}
.weather-input .location-btn:hover {
  background: #87ceeb;
}
</style>
