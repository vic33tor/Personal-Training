<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
  links: Array,
});
</script>

<template>
  <header class="fixed bottom-0 w-full bg-neutral-700">
    <div class="contenedorNav">
      <nav class="nav flex justify-center">
        <RouterLink
          v-for="link in props.links"
          :key="link"
          :to="{ name: link }"
        >
          <img :src="`./src/assets/${link}.png`" class="h-6 w-6" id="imagen" />
          {{ link }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Estilos del navbar */
nav a {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
}
.router-link-active {
  --tw-text-opacity: 1;
  color: rgb(253 224 71 / var(--tw-text-opacity));
}

/* Estilos de posicionamiento */
header {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  /* z-index: 9999; /* Ajusta este valor según sea necesario */
}

.contenedorNav {
  font-size: small;
  padding: 10px 0 20px 0;
  border-top: 1px solid white;
  box-shadow: 10px 10px 10px 10px black;
}
</style>
