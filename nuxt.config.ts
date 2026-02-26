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