<template>
  <v-app>
    <Header />
    <v-main class="pa-4 contenido">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<style scoped>
.contenido {
  margin-top: 80px;
}
</style>
