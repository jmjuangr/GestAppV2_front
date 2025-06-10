<template>
  <v-container>
    <h1 class="mb-4">Productos disponibles</h1>

    <v-row>
      <v-col
        v-for="producto in store.productos"
        :key="producto.idProducto"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-card-title>{{ producto.nombreProducto }}</v-card-title>
          <v-card-subtitle
            >Precio: {{ producto.precioProducto }}€</v-card-subtitle
          >
          <v-card-text>Categoría: {{ producto.categoria }}</v-card-text>
          <v-checkbox
            label="Seleccionar"
            :value="producto.idProducto"
            v-model="productosSeleccionados"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-btn
      class="mt-4"
      color="primary"
      @click="crearPedido"
      :disabled="productosSeleccionados.length === 0"
    >
      Crear Pedido
    </v-btn>

    <v-btn
      class="mt-4 ml-2"
      color="success"
      @click="generarFactura"
      :disabled="!ultimoIdPedido"
    >
      Generar Factura
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGestAppStore } from "../store/gestapp";

const store = useGestAppStore();
const productosSeleccionados = ref<number[]>([]);
const ultimoIdPedido = ref<number | null>(null);

onMounted(() => {
  store.fetchProductos();
});

const crearPedido = async () => {
  try {
    await store.addPedido(productosSeleccionados.value);
    alert("Pedido creado correctamente");

    const ultPedido =
      store.pedidos.length > 0 ? store.pedidos[store.pedidos.length - 1] : null;
    ultimoIdPedido.value = ultPedido ? ultPedido.idPedido : null;

    productosSeleccionados.value = [];
  } catch (error) {
    alert("Error al crear pedido");
  }
};

const generarFactura = async () => {
  if (!ultimoIdPedido.value) return;

  try {
    await store.addFactura(ultimoIdPedido.value);
    alert("Factura generada para pedido ID " + ultimoIdPedido.value);
    ultimoIdPedido.value = null;
  } catch (error) {
    alert("Error al generar factura");
  }
};
</script>
