<template>
  <div class="text-center mt-2 ">
    <h1 class="text-white text-2xl">Contrata tu monitor</h1>
    <ul class="flex flex-col gap-6 w-fit justify-center">
      <li
        v-for="item in monitores"
        :key="item.id"
        class="border border-gray-300 rounded-lg p-4 flex items-center"
      >
        <div class= "mr-4">
          <img
            src="../assets/Images/monitGym.jpg"
            alt="Imagen del monitor"
            class="w-20 h-20 object-cover rounded-full"
          />
        </div>
        <div class="mr-4">
          <h1 class="text-xl text-white font-bold">{{ item.name }}</h1>
          <p class="text-white">{{ item.especialidad }}</p>
        </div>
        <div class="flex-grow"></div>
        <button class="bg-yellow-300 rounded-sm px-4 py-2 hover:bg-yellow-500">
          Contratar
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { onDameReceta } from "../API/firebase";

const monitores = ref([]);

onMounted(() => {
  dameMonitores();
});

const dameMonitores = () => {
  onDameReceta("MONITORES", (docs) => {
    monitores.value = [];
    docs.forEach((doc) => {
      monitores.value.push({ id: doc.id, ...doc.data() });
    });
  });
};
</script>

<style scoped>

</style>
