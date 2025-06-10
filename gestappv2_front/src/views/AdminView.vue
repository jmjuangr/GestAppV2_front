<template>
  <v-container>
    <h2 class="text-h5 mb-4">Gestión de Productos</h2>
    <v-form @submit.prevent="agregarProducto">
      <v-text-field v-model="nombre" label="Nombre del producto" required />
      <v-text-field v-model="precio" type="number" label="Precio" required />
      <v-text-field v-model="categoria" label="Categoría" required />
      <v-btn type="submit" color="success">Agregar Producto</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGestAppStore } from "../store/gestapp";

const store = useGestAppStore();
const nombre = ref("");
const precio = ref(0);
const categoria = ref("");

const agregarProducto = async () => {
  await store.addProducto({
    nombreProducto: nombre.value,
    precioProducto: precio.value,
    categoria: categoria.value,
  });
  nombre.value = "";
  precio.value = 0;
  categoria.value = "";
};
</script>
