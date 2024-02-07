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
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

.app {
  min-height: 100vh;
}

html {
  background-color: #cee2fd;
}

body {
  overflow: auto;
  height: 100%;
  min-height: 100svh;
  font-family: 'Public Sans', sans-serif;
}

img,
picture,
svg,
video {
  display: block;
  max-width: 100%;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

p {
  max-width: 75ch;
  text-wrap: pretty;
}
</style>
