<template>
  <div
    class="flex mx-auto bg-white rounded-xl shadow-md overflow-hidden w-3/4 mt-3 mb-3"
  >
    <div class="w-3/4">
      <img
        :src="recetaActual.Img"
        alt="Imagen de la receta"
        class="w-full h-64 object-cover object-center"
      />
      <div class="p-6">
        <h2 class="text-xl font-semibold">{{ recetaActual.Nombre }}</h2>
        <p class="text-gray-500">{{ recetaActual.LongDesc }}</p>
      </div>
    </div>
    <aside class="w-1/4 bg-gray-100 p-6">
      <h3 class="text-lg font-semibold mb-4">Ingredientes</h3>
      <ul class="list-none ml-4">
        <li v-for="ingrediente in recetaActual.Ingredientes" :key="ingrediente " class="mt-2 rounded-sm">
          {{ ingrediente }}
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { onDameReceta } from "../API/firebase";

const route = useRoute();
const recetaActual = ref({});

onMounted(() => {
  dameRecetaFiltrada(route.query.id);
});

const dameRecetaFiltrada = (id) => {
  onDameReceta("RECETAS", (docs) => {
    docs.forEach((doc) => {
      if (doc.id === id) {
        recetaActual.value = { id: doc.id, ...doc.data() };
      }
    });
  });
};
</script>

<style scoped></style>
