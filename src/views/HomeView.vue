<template>
  <main class="main">
    <WeatherInput />
    <SavedCities />
  </main>
</template>

<script setup>
import WeatherInput from '../components/WeatherInput.vue';
import SavedCities from '../components/SavedCities.vue';
</script>

<style lang="css" scoped>
.main {
  padding: 2rem;
}

@media (max-width: 1265px) {
  .main {
    display: flex;
    flex-direction: column;
  }

  .saved-cities {
    padding: 0;
  }
}
</style>
