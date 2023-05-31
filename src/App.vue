<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import CabeceraPrincipal from "@/components/CabeceraPrincipal.vue";
import { computed, ref } from "vue";

import { useDatosStore } from "@/stores/DatosForm";

const datos = useDatosStore();
const isLog = computed(() => datos.getIsLogin);
</script>

<template>
  <div class="app">
    <div v-if="isLog">
      <CabeceraPrincipal titulo="Just Fit" />
    </div>

    <RouterView />

    <div class="basis-1/5" v-if="isLog">
      <NavBar
        :links="['Inicio', 'Rutina', 'Ejercicios', 'Progreso', 'Servicios']"
      />
    </div>
  </div>
</template>

<style scoped>
.app {
  background-color: rgb(63, 63, 63);
}
</style>
