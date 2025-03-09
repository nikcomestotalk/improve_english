import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],

  runtimeConfig: {
    public: {
      excelFilePath: '/data/et.xlsx',
    }
  },

  build: {
    transpile: ['xlsx']
  },

  compatibilityDate: '2025-03-09'
});
import { ref, onMounted, watch } from 'vue';

const userSelection = ref(null);

onMounted(() => {
  const savedSelection = localStorage.getItem('userSelection');
  if (savedSelection) {
    userSelection.value = JSON.parse(savedSelection);
  }
});

watch(userSelection, (newSelection) => {
  localStorage.setItem('userSelection', JSON.stringify(newSelection));
});