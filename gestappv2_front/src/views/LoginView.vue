<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h2 class="text-h5 text-center mb-4">Iniciar sesión</h2>
        <v-form @submit.prevent="login">
          <v-text-field v-model="nombre" label="Nombre" required />
          <v-text-field
            v-model="pass"
            label="Contraseña"
            type="password"
            required
          />
          <v-btn type="submit" color="primary" class="mt-2" block>Entrar</v-btn>
          <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGestAppStore } from "../store/gestapp";

const nombre = ref("");
const pass = ref("");
const error = ref("");
const router = useRouter();
const store = useGestAppStore();

const login = async () => {
  try {
    await store.login(nombre.value, pass.value);
    if (store.usuario?.admin) {
      router.push("/admin");
    } else {
      router.push("/user");
    }
  } catch (err) {
    error.value = "Credenciales incorrectas. Inténtalo de nuevo.";
  }
};
</script>
