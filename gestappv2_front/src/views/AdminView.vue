<template>
  <v-container>
    <v-tabs v-model="tab" grow>
      <v-tab>Productos</v-tab>
      <v-tab>Usuarios</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <!-- GESTIÓN DE PRODUCTOS -->
      <v-window-item>
        <h2 class="text-h6 mt-4">Agregar Producto</h2>
        <v-form @submit.prevent="agregarProducto">
          <v-text-field v-model="nombre" label="Nombre" required />
          <v-text-field
            v-model="precio"
            type="number"
            label="Precio"
            required
          />
          <v-text-field v-model="categoria" label="Categoría" required />
          <v-btn type="submit" color="success" class="mt-2">Agregar</v-btn>
        </v-form>

        <v-divider class="my-4" />

        <h3 class="text-h6 mb-2">Listado de Productos</h3>
        <v-row>
          <v-col
            v-for="producto in store.productos"
            :key="producto.idProducto"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card :elevation="2" class="pa-2">
              <v-card-title>{{ producto.nombreProducto }}</v-card-title>
              <v-card-subtitle>
                {{ producto.categoria }} - {{ producto.precioProducto }} €
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>

      <!-- GESTIÓN DE USUARIOS -->
      <v-window-item>
        <h2 class="text-h6 mt-4">Usuarios Registrados</h2>
        <v-list v-if="usuarios.length > 0">
          <v-list-item
            v-for="usuario in usuarios"
            :key="usuario.id"
            class="d-flex justify-space-between align-center"
          >
            <div class="d-flex align-center justify-space-between w-100">
              <span
                ><strong>{{ usuario.nombre }}</strong> - Rol:
                {{ usuario.rol }}</span
              >
              <v-btn
                icon
                color="red"
                @click="eliminarUsuario(usuario.id)"
                :disabled="usuario.nombre === store.usuario?.nombre"
                v-if="
                  usuario.rol !== 'Admin' ||
                  usuario.nombre !== store.usuario?.nombre
                "
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-list-item>
        </v-list>
        <p v-else>No hay usuarios registrados.</p>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGestAppStore } from "../store/gestapp";

const store = useGestAppStore();

const nombre = ref("");
const precio = ref(0);
const categoria = ref("");
const tab = ref(0);

interface UsuarioDTO {
  id: number;
  nombre: string;
  rol: string;
}

const usuarios = ref<UsuarioDTO[]>([]);

onMounted(async () => {
  await store.fetchProductos();
  await cargarUsuarios();
});

const agregarProducto = async () => {
  await store.addProducto({
    nombreProducto: nombre.value,
    precioProducto: precio.value,
    categoria: categoria.value,
  });

  nombre.value = "";
  precio.value = 0;
  categoria.value = "";

  await store.fetchProductos();
};

const cargarUsuarios = async () => {
  const res = await fetch("http://localhost:8870/api/usuario", {
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
  });
  usuarios.value = await res.json();
};

const eliminarUsuario = async (id: number) => {
  const confirmacion = confirm(
    "¿Estás seguro de que deseas eliminar este usuario?"
  );
  if (!confirmacion) return;

  const res = await fetch(`http://localhost:8870/api/usuario/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
  });

  if (res.ok) {
    alert("Usuario eliminado");
    await cargarUsuarios();
  } else {
    alert("Error al eliminar usuario");
  }
};
</script>
