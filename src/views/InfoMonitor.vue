<template>
  <div class="contenedorMonitor rounded-xl shadow-md">
    <div class="w-4/4">
      <img :src="monitorActual.img" alt="Imagen del monitor" class="w-full" />
    </div>
    <div class="p-6 mb-6">
      <div class="flex flex-row gap-2">
        <h2 class="text-xl font-semibold">{{ monitorActual.name }}</h2>
        <h2 class="text-xl font-semibold">{{ monitorActual.surnames }}</h2>
      </div>
      <p class="text-gray-500 mt-1">
        Especialidad: {{ monitorActual.especialidad }}
      </p>
      <h1 class="mt-1">{{ monitorActual.desc }}</h1>
    </div>
    <div class="items-end content-end text-right">
      <button
        v-if="datos.getTieneMonitor !== monitorActual.id"
        @click="contrataMonitor(monitorActual.id)"
        class="bg-yellow-300 rounded-md px-4 py-2 hover:bg-yellow-500 w-4/12 mr-8"
      >
        Contratar
      </button>
      <button
        v-else
        @click="eliminaMonitor(monitorActual.id)"
        class="bg-yellow-300 rounded-md px-4 py-2 hover:bg-yellow-500 w-4/12 mr-8"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { onDameReceta, onGetMonitorId, updateMonitorId } from "../API/firebase";
import { useRoute } from "vue-router";
import { useDatosStore } from "@/stores/DatosForm";

const route = useRoute();
const datos = useDatosStore();
const monitorActual = ref({});
const idMonitorActual = ref();

onMounted(() => {
  dameMonitor(route.query.id);
  dameIdMonitor();
});

const dameMonitor = (id) => {
  onDameReceta("MONITORES", (docs) => {
    docs.forEach((doc) => {
      if (doc.id === id) {
        monitorActual.value = { id: doc.id, ...doc.data() };
      }
    });
  });
};

const dameIdMonitor = () => {
  onGetMonitorId("USUARIOS", (docs) => {
    docs.forEach((doc) => {
      if (doc.id == datos.getUsuario) {
        idMonitorActual.value = doc.data().monitorid;
        datos.guardarTieneMonitor(idMonitorActual.value);
      }
    });
  });
};

const contrataMonitor = (monitorid) => {
  dameIdMonitor();
  if (idMonitorActual.value != "") {
    if (
      confirm(
        "Si ya tiene un monitor contratado, este se sustituirá: ¿desea continuar?"
      ) === true
    ) {
      updateMonitorId("USUARIOS", datos.getUsuario, { monitorid: monitorid });
      datos.guardarTieneMonitor(monitorid);
      alert("El contrato con su monitor ha sido actualizado");
    } else {
      alert("Operación cancelada");
    }
  } else {
    updateMonitorId("USUARIOS", datos.getUsuario, { monitorid: monitorid });
    datos.guardarTieneMonitor(monitorid);
    alert("Monitor contratado");
  }
};
const eliminaMonitor = () => {
  updateMonitorId("USUARIOS", datos.getUsuario, { monitorid: "" });
  alert("El contrato con su monitor ha sido actualizado");
  datos.guardarTieneMonitor("");
};
</script>

<style scoped>
.contenedorMonitor {
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  margin: 0 auto;
  margin-top: 10px;
  width: 40%;
  padding-bottom: 50px;
  margin-bottom: 90px;
}
</style>
