<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
  links: Array,
});
</script>

<template>
  <header>
    <div class="border-t-4 border-white text-sm pt-10">
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
</style>
