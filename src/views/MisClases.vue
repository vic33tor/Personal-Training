<template>
  <div class="text-center text-white text-2xl mt-2">
    <h1>Clases grupales</h1>
    <select v-model="opciones" class="mt-2 text-black">
      <option value="">Todos</option>
      <option value="contacto">Deportes de contacto</option>
      <option value="baile">Baile</option>
      <option value="yoga">Yoga</option>
      <!-- Agrega las opciones que necesites -->
    </select>
    <ul class="estilosLista gap-3">
      <li
        v-for="item in clasesFiltro"
        :key="item.id"
        class="border border-gray-300 rounded-lg p-4 flex flex-col items-center"
      >
        <div class="mr-4">
          <img
            src="../assets/Images/monitGym.jpg"
            alt="Imagen del monitor"
            class="w-40 h-20 object-cover rounded-full"
          />
        </div>
        <div class="mr-4 text-center border-2 border-white w-full">
          <h1 class="text-xl text-white font-bold">{{ item.nombre }}</h1>
          <p class="text-white">{{ item.desc }}</p>
        </div>

        <button class="bg-yellow-300 rounded-sm px-4 py-2 hover:bg-yellow-500">
          Contratar
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onGetClases } from "../API/firebase";
import { onMounted, ref, computed } from "vue";

const misClases = ref([]);
const opciones = ref("");

onMounted(() => {
  dameClases();
});

const dameClases = () => {
  misClases.value = [];
  onGetClases("CLASES", (docs) => {
    docs.forEach((doc) => {
      misClases.value.push({ id: doc.id, ...doc.data() });
    });
  });
};

const clasesFiltro = computed(() => {
  if (!opciones.value) {
    return misClases.value;
  } else {
    return misClases.value.filter((x) => {
      return x.tipo === opciones.value;
    });
  }
});
</script>

<style scoped>
.estilosLista {
  display: grid;
  grid-template-columns: 49% 49%;
}
</style>
