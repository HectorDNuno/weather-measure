import { reactive, watchEffect } from 'vue';

export const sharedState = reactive({
  savedCities: JSON.parse(localStorage.getItem('savedCities') || '[]')
});

watchEffect(() => {
  localStorage.setItem('savedCities', JSON.stringify(sharedState.savedCities));
});
