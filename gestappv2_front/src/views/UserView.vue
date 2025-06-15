<template>
  <v-container>
    <h2 class="text-h5 mb-4">Realizar Pedido</h2>

    <v-row>
      <v-col
        v-for="producto in store.productos"
        :key="producto.idProducto"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card :elevation="2">
          <v-card-title>{{ producto.nombreProducto }}</v-card-title>
          <v-card-subtitle>
            {{ producto.categoria }} - {{ producto.precioProducto }} €
          </v-card-subtitle>
          <v-card-actions>
            <v-checkbox
              v-model="productosSeleccionados"
              :value="producto.idProducto"
              label="Seleccionar"
              hide-details
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-btn
      :disabled="productosSeleccionados.length === 0"
      color="primary"
      class="mt-4"
      @click="crearPedido"
    >
      Crear Pedido
    </v-btn>

    <v-btn
      v-if="ultimoIdPedido"
      color="secondary"
      class="mt-2 ml-4"
      @click="generarFactura"
    >
      Generar Factura para el último pedido
    </v-btn>

    <v-divider class="my-6" />

    <h3 class="text-h6">Tus Pedidos</h3>
    <v-list v-if="store.pedidos.length > 0">
      <v-list-item v-for="pedido in store.pedidos" :key="pedido.idPedido">
        <div>
          <div class="text-subtitle-1">
            Pedido ID {{ pedido.idPedido }} - {{ pedido.fecha }}
          </div>
          <div class="text-caption">
            Productos:
            {{ pedido.productos.map((p) => p.nombreProducto).join(", ") }} |
            Confirmado: {{ pedido.confirmado ? "Sí" : "No" }}
          </div>
        </div>
      </v-list-item>
    </v-list>
    <p v-else>No hay pedidos realizados todavía.</p>

    <v-divider class="my-6" />
    <h3 class="text-h6">Facturas</h3>

    <v-text-field
      v-model="busquedaPedidoId"
      label="Buscar factura por ID de Pedido"
      type="number"
      class="mb-4"
      @keyup.enter="buscarFactura"
    />

    <v-list v-if="facturasFiltradas.length > 0">
      <v-list-item
        v-for="factura in facturasFiltradas"
        :key="factura.idFactura"
      >
        <div>
          <div class="text-subtitle-1">
            Factura ID {{ factura.idFactura }} - Pedido {{ factura.idPedido }}
          </div>
          <div class="text-caption">
            Importe: {{ factura.importeTotal }} € | Pagada:
            {{ factura.estaPagada ? "Sí" : "No" }}
          </div>
        </div>
      </v-list-item>
    </v-list>
    <p v-else>No hay facturas disponibles.</p>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useGestAppStore } from "../store/gestapp";

const store = useGestAppStore();

const productosSeleccionados = ref<number[]>([]);
const ultimoIdPedido = ref<number | null>(null);
const busquedaPedidoId = ref<number | null>(null);

onMounted(() => {
  if (store.productos.length === 0) {
    store.fetchProductos();
  }
});

const crearPedido = async () => {
  try {
    await store.addPedido(productosSeleccionados.value);
    alert("Pedido creado correctamente");

    await store.fetchPedidos();

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

    await store.fetchFacturas();
    ultimoIdPedido.value = null;
  } catch (error) {
    alert("Error al generar factura");
  }
};

const facturasFiltradas = computed(() => {
  if (!busquedaPedidoId.value) return store.facturas;
  return store.facturas.filter((f) => f.idPedido === busquedaPedidoId.value);
});

const buscarFactura = async () => {
  await store.fetchFacturas();
};
</script>
