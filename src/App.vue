<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import CabeceraPrincipal from "@/components/CabeceraPrincipal.vue";
</script>

<template>
  <CabeceraPrincipal titulo="Personal training" />

  <div>
    <RouterView />
  </div>
  <NavBar :links="['Inicio', 'Rutina', 'Ejercicios', 'Progreso']" />
</template>

<style scoped></style>
