<template>
  <div class="text-center mt-2">
    <h1 class="text-white text-2xl">Contrata tu monitor</h1>
    <div class="containerLista">
      <ul class="flex flex-col gap-6 w-fit justify-center">
        <li
          v-for="item in monitores"
          :key="item.id"
          class="border border-gray-300 rounded-lg p-4 flex items-center w-1/2"
        >
          <div class="mr-4">
            <img
              src="../assets/Images/monitGym.jpg"
              alt="Imagen del monitor"
              class="w-40 h-20 object-cover rounded-full"
            />
          </div>
          <div class="mr-4 text-center border-2 border-white w-full">
            <h1 class="text-xl text-white font-bold">{{ item.name }}</h1>
            <p class="text-white">Especialidad: {{ item.especialidad }}</p>
          </div>
          <div class="flex-grow"></div>
          <button
            @click="contrataMonitor(item.id)"
            class="bg-yellow-300 rounded-sm px-4 py-2 hover:bg-yellow-500"
          >
            Contratar
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { onDameReceta, onGetMonitorId, updateMonitorId } from "../API/firebase";
import { useDatosStore } from "@/stores/DatosForm";
import { useRouter } from "vue-router";

const datos = useDatosStore();
const router = useRouter();
const monitores = ref([]);
const idMonitorActual = ref();

onMounted(() => {
  dameMonitores();
});

const dameMonitores = () => {
  monitores.value = [];
  onDameReceta("MONITORES", (docs) => {
    docs.forEach((doc) => {
      monitores.value.push({ id: doc.id, ...doc.data() });
    });
  });
};

const dameIdMonitor = () => {
  onGetMonitorId("USUARIOS", datos.getUsuario, (docs) => {
    docs.forEach((doc) => {
      idMonitorActual.value = doc.data().monitorid;
    });
  });
};

const contrataMonitor = (monitorid) => {
  dameIdMonitor();
  if (idMonitorActual.value != "") {
    if (
      confirm(
        "ya tiene un monitor contratado, ¿desea sustituir su monitor actual por el seleccionado actualmente?"
      ) === true
    ) {
      updateMonitorId("USUARIOS", datos.getUsuario, { monitorid: monitorid });
      alert("El contrato con su monitor ha sido actualizado");
    } else {
      alert("Operación cancelada");
    }
  } else {
    updateMonitorId("USUARIOS", datos.getUsuario, { monitorid: monitorid });
    alert("Monitor contratado");
  }
};
</script>

<style scoped>
ul {
  place-content: center;
  place-items: center;
  width: 100%;
}
</style>
