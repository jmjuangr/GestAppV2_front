<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h2 class="text-h5 text-center mb-4">Registro de usuario</h2>
        <v-form @submit.prevent="registrar">
          <v-text-field v-model="nombre" label="Nombre de usuario" required />
          <v-text-field
            v-model="pass"
            label="Contraseña"
            type="password"
            required
          />
          <v-btn type="submit" color="primary" class="mt-2" block>
            Registrarse
          </v-btn>

          <v-alert v-if="mensaje" type="success" class="mt-4">
            {{ mensaje }}
          </v-alert>
          <v-alert v-if="error" type="error" class="mt-4">
            {{ error }}
          </v-alert>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGestAppStore } from "../store/gestapp";

const store = useGestAppStore();
const router = useRouter();

const nombre = ref("");
const pass = ref("");
const rol = ref("User"); // Por defecto

const mensaje = ref("");
const error = ref("");

const registrar = async () => {
  error.value = "";
  try {
    await store.registerUsuario({
      nombre: nombre.value,
      pass: pass.value,
      rol: rol.value,
    });
    mensaje.value = "Usuario registrado correctamente. Redirigiendo...";

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (err: any) {
    error.value = err.message || "Error al registrar";
  }
};
</script>
