<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import CabeceraPrincipal from "@/components/CabeceraPrincipal.vue";
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="basis-4/5">
      <CabeceraPrincipal titulo="Personal training" />
      <RouterView />
    </div>
    <div class="basis-1/5">
      <NavBar :links="['Inicio', 'Rutina', 'Ejercicios', 'Progreso']" />
    </div>
  </div>
</template>

<style scoped></style>
