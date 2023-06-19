<template>
  <div class="contenedor text-center mt-2">
    <div class="textoInicio flex gap-3">
      <h1 class="text-white text-3xl pt-2 mb-2">Nuestros</h1>
      <h1 class="name text-white text-3xl pt-2 mb-2">monitores</h1>
    </div>
    <div class="containerLista">
      <ul class="flex flex-col w-fit justify-center">
        <li
          v-for="item in monitores"
          :key="item.id"
          class="monitor rounded-lg p-4 flex items-center bg-zinc-800 w-2/4 text-gray-200"
        >
          <div class="ml-2">
            <img
              :src="item.img"
              alt="Imagen del monitor"
              class="w-40 h-20 object-cover rounded-full"
            />
          </div>
          <div
            class="text-center w-full cursor-pointer"
            @click="verMonitor(item.id)"
          >
            <h1 class="text-xl text-white font-bold">{{ item.name }}</h1>
            <p class="text-white">Especialidad: {{ item.especialidad }}</p>
          </div>

          <button
            v-if="datos.getTieneMonitor !== item.id"
            @click="contrataMonitor(item.id)"
            class="bg-yellow-300 rounded-md px-4 py-2 hover:bg-yellow-200 mr-2 text-black transition-colors"
          >
            Contratar
          </button>
          <button
            v-else
            @click="eliminaMonitor()"
            class="bg-red-400 rounded-md px-4 py-2 hover:bg-red-200 mr-2 text-black transition-colors"
          >
            Eliminar
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
const idMonitorActual = ref("");

onMounted(() => {
  dameMonitores();
  dameIdMonitor();
});

const dameMonitores = () => {
  monitores.value = [];
  onDameReceta("MONITORES", (docs) => {
    docs.forEach((doc) => {
      monitores.value.push({ id: doc.id, ...doc.data() });
    });
  });
};

const verMonitor = (id) => {
  router.push({
    name: "InfoMonitor",
    query: { id },
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
ul {
  place-content: center;
  place-items: center;
  width: 100%;
}

.textoInicio {
  place-content: center;
}
.monitor {
  height: fit-content;
  padding: 6px;
  box-shadow: 0 4px 8px 0 rgba(162, 255, 0, 0.2);
  transition: 0.3s;
  color: white;
  border-radius: 10px;
}

.monitor:hover {
  box-shadow: 0 15px 16px 0 rgba(229, 255, 0, 0.2);
  transform: scale(1.02);
}

.name {
  color: yellow;
}

@media screen and (max-width: 830px) {
  .monitor {
    display: flex;
    flex-direction: column;
  }
}
</style>
