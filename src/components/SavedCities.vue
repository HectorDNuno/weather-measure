<template>
  <div class="current-weather">
    <div>
      <h2>______ (______)</h2>
      <h6>Temperature: __&deg;F</h6>
      <h6>Wind: __ mph</h6>
      <h6>Humidity: __%</h6>
    </div>

    <i class="fa-solid fa-circle-minus fa-2x"></i>
  </div>
</template>

<script setup></script>

<style lang="css" scoped>
.current-weather {
  display: flex;
  max-width: 330px;
  justify-content: space-between;
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  padding: 1rem;
  color: #000;
  background: #aac7fe;
}
.current-weather h6 {
  margin-top: 12px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 2px;
}

.current-weather p {
  letter-spacing: 2px;
}
.current-weather h2 {
  font-weight: 700;
  font-size: 1.7rem;
  letter-spacing: 2px;
}

.current-weather i {
  height: min-content;
  color: #fff;
  background: #000;
  border: 3px solid #000;
  border-radius: 100%;
  box-shadow: 2px 2px 0px #000;
  cursor: pointer;
}

.current-weather i:hover {
  color: #6c757d;
}
</style>
