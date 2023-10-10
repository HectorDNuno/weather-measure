<template>
  <header class="container">
    <nav class="nav">
      <RouterLink :to="{ name: 'home' }" style="text-decoration: none; color: inherit">
        <div class="branding">
          <h1>Local Weather</h1>
          <i class="fa-solid fa-certificate fa-2x"></i>
        </div>
      </RouterLink>

      <div class="info">
        <i @click="toggleModal" class="fa-solid fa-circle-info"></i>
      </div>

      <BaseModal @close-modal="toggleModal" :modal-active="modalActive">
        <div class="content">
          <h1>About:</h1>
          <p>
            Local Weather allows you to track the current and future weather of cities of your
            choosing.
          </p>

          <h2>How it works:</h2>
          <ol>
            <li>Search for your city by entering the name into the search bar.</li>
            <li>
              Select a city within the results, this will show you the current weather for your
              selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This will save the city
              to view on the home page.
            </li>
          </ol>

          <h2>Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply click the "-" icon in the top right of
            your saved city within the list.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import BaseModal from './BaseModal.vue';

const modalActive = ref(null);

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<style lang="css" scoped>
.container {
  position: sticky;
  top: 0;
  background: #3300ff;
  border-bottom: 3px solid #000;
  padding: 0.5rem 1rem;
}

.nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav .branding {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.3rem;
  color: #fff;
}

.branding h1 {
  letter-spacing: 5px;
}

.nav .info i {
  height: min-content;
  color: #fff;
  background-color: #000;
  border: 3px solid #000;
  border-radius: 100%;
  box-shadow: 2px 2px 0px #000;
  cursor: pointer;
}

.nav .info i:hover {
  color: #6c757d;
}

.content h1,
h2 {
  margin-top: 0.5rem;
}

.content ol {
  padding: 0 2.5rem;
}
</style>
