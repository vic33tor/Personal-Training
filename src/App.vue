<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import CabeceraPrincipal from "@/components/CabeceraPrincipal.vue";
</script>

<template>
  <div class="h-full">
    <div class="">
      <CabeceraPrincipal titulo="Just Fit" />
      <RouterView />
    </div>
    <div class="basis-1/5">
      <NavBar
        :links="['Inicio', 'Rutina', 'Ejercicios', 'Progreso', 'Servicios']"
      />
    </div>
  </div>
</template>

<style scoped>
* {
  background-color: rgb(63, 63, 63);
}
</style>
