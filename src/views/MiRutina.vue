<template>
  <div>
    <nav class="nav flex justify-center">
      <RouterLink v-for="nombre in link" :key="nombre" :to="{ name: nombre }">
        {{ nombre }}
      </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
const link = ["Ver tu rutina", "Crea tu rutina"];
</script>

<style scoped>
nav a {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
  border-bottom: 1px solid white;
  margin: 15px;
}
.router-link-active {
  --tw-text-opacity: 1;
  color: rgb(253 224 71 / var(--tw-text-opacity));
}
</style>
