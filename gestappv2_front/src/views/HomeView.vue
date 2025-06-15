<template>
  <v-container>
    <h1 class="text-h5 mb-4">Catálogo de Productos</h1>
    <v-row>
      <v-col
        v-for="producto in productos"
        :key="producto.idProducto"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-card-title>{{ producto.nombreProducto }}</v-card-title>
          <v-card-subtitle>
            Precio: {{ producto.precioProducto }} €
          </v-card-subtitle>
          <v-card-text> Categoría: {{ producto.categoria }} </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useGestAppStore } from "../store/gestapp";

const store = useGestAppStore();
const productos = computed(() => store.productos);

onMounted(() => {
  store.fetchProductos();
});
</script>
