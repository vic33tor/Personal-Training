<template>
  <header class="header">
    <div class="logo-header">
      <a href=""><img :src="props.imagen" alt="" /></a>
    </div>
    <div class="nav-menu">
      <div class="p-6">
        <h1 class="text-left text-3xl text-yellow-300 font-bold">
          {{ props.titulo }}
        </h1>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  titulo: String,
  imagen: String,
});
</script>

<style scoped></style>
