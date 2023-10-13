<template>
  <div class="app">
    <NavigationBar />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import NavigationBar from './components/NavigationBar.vue';
</script>

<style lang="css">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Public Sans', sans-serif;
}

.app {
  min-height: 100vh;
}

html {
  overflow: hidden;
  height: 100%;
}

body {
  overflow: auto;
  height: 100%;
}
</style>
