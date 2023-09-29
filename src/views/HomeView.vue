<template>
  <main>
    <nav class="nav">
      <h1>Local Weather</h1>
    </nav>

    <div class="container">
      <WeatherInput />
      <WeatherData />
    </div>
  </main>
</template>

<script setup>
import WeatherInput from '../components/WeatherInput.vue'
import WeatherData from '../components/WeatherData.vue'
</script>

<style lang="css">
.container {
  display: flex;
  gap: 35px;
  padding: 30px;
}

.nav {
  background: #5372f0;
  font-size: 1.3rem;
  text-align: center;
  padding: 18px 0;
  color: #fff;
}
</style>
