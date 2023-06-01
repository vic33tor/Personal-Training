<template>
  <div class="contenedorMonitor rounded-xl shadow-md overflow-hidden">
    <div class="w-4/4">
      <img :src="claseActual.img" alt="Imagen del clase" class="w-full" />
    </div>
    <div class="contenedorTitulo p-6 mb-6">
      <div>
        <h2 class="text-xl font-semibold">{{ claseActual.nombre }}</h2>
        <p class="text-gray-500 mt-1">Duración: {{ claseActual.duracion }}</p>
        <p class="text-gray-500 mt-1">
          Hora: {{ claseActual.horaInicio }}-{{ claseActual.horaFin }}
        </p>
        <p class="text-gray-500 mt-1">
          Selecciona el día que quieres asistir:
          <select name="" id="" v-model="seleccionDia">
            <option
              v-for="(item, idx) in claseActual.dias"
              :key="idx"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </p>
      </div>
      <div></div>
    </div>

    <div class="items-end content-end text-right">
      <button
        @click="asistirClase(claseActual)"
        class="bg-yellow-300 rounded-md px-4 py-2 hover:bg-yellow-500 w-4/12 mr-8"
      >
        Asistir
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { onDameReceta, updateClasesContratadas } from "../API/firebase";
import { useRoute } from "vue-router";
import { useDatosStore } from "@/stores/DatosForm";

const datos = useDatosStore();
const route = useRoute();
const claseActual = ref([]);
const clasesAsignadas = ref([]);
const seleccionDia = ref("");

onMounted(() => {
  dameClase(route.query.id);
});

const dameClase = (id) => {
  onDameReceta("CLASES", (docs) => {
    docs.forEach((doc) => {
      if (doc.id === id) {
        claseActual.value = { id: doc.id, ...doc.data() };
      }
    });
  });
};

const asistirClase = (claseActual) => {
  updateClasesContratadas("USUARIOS", datos.getUsuario, {
    nombre: claseActual.nombre,
    dia: seleccionDia.value,
    inicio: claseActual.horaInicio,
    fin: claseActual.horaFin,
  });
};
</script>

<style scoped>
.contenedorMonitor {
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  margin: 0 auto;
  margin-top: 10px;
  width: 50%;
  padding-bottom: 50px;
}

.contenedorTitulo {
  display: flex;
  justify-content: space-between;
}
</style>
