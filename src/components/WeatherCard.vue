<template>
  <div class="card">
    <h3>
      {{ new Date(data.date * 1000).toLocaleDateString('en-us', { weekday: 'short' }) }}
      {{ new Date(data.date * 1000).getDate() }}
    </h3>

    <img :src="`http://openweathermap.org/img/wn/${data.img}@2x.png`" alt="" />

    <h4>High: {{ Math.round(data.high) }}&deg;F</h4>
    <h4>Low: {{ Math.round(data.low) }}&deg;F</h4>
    <h4>Rain: {{ data.rain ? Math.round(data.rain) : 0 }}%</h4>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object
  }
});
</script>

<style lang="css" scoped>
.card {
  color: #fff;
  background: #6c757d;
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  padding: 1rem;
  text-align: center;
}

.card h4 {
  margin-top: 5px;
  font-weight: 500;
  letter-spacing: 2px;
}
.card img {
  max-width: 4.3rem;
}
</style>
