<script setup lang="ts">
import { NuxtPage } from '#components';

</script>

<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-purple-500/30">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

html, body {
  font-family: 'Outfit', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #0f172a; /* slate-900 fallback */
}

/* Base custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #475569;
}
</style>
