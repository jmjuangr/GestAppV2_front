<template>
  <v-container class="mt-5" max-width="400">
    <v-card>
      <v-card-title>Registro</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="registrar">
          <v-text-field label="Nombre de usuario" v-model="nombre" required />
          <v-text-field
            label="Contraseña"
            type="password"
            v-model="pass"
            required
          />
          <v-btn type="submit" color="primary" class="mt-3">Registrarse</v-btn>
        </v-form>
        <div v-if="mensaje" class="mt-3">{{ mensaje }}</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGestAppStore } from "../store/gestapp";

const store = useGestAppStore();

const nombre = ref("");
const pass = ref("");
const mensaje = ref("");

const registrar = async () => {
  try {
    await store.registerUsuario({
      nombre: nombre.value,
      pass: pass.value,
      rol: "User",
    });
    mensaje.value = "Usuario registrado correctamente.";
    nombre.value = "";
    pass.value = "";
  } catch (error) {
    mensaje.value = "Error al registrar usuario.";
  }
};
</script>
