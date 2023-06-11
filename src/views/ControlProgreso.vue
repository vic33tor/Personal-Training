<template>
  <div v-if="datos.getIdProgreso">
    <div class="w-full place-content-center place-items-center text-center">
      <h1 class="text-3xl text-white">Progreso activo</h1>
      <div class="mt-2 place-content-center place-items-center text-center">
        <div
          v-for="item in progreso"
          :key="item.id"
          class="flex justify-center"
        >
          <div class="p-3 bg-zinc-800 w-2/4 rounded-lg text-gray-200">
            <h1>Ejercicio: {{ item.nombre }}</h1>
            <h2>Aportaciones: {{ item.dias.length }}</h2>
            <button
              @click="borrarProgreso()"
              class="mt-3 mb-3bg rounded-md p-1 bg-yellow-300 text-zinc-800 hover:bg-yellow-200 transition-all"
            >
              Borrar progreso
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div v-if="!datos.getIdProgreso">
      <div
        class="w-full place-content-center place-items-center text-center mt-4"
      >
        <h1 class="text-3xl text-white pb-4">Crea tu progreso</h1>
        <h1 class="text-1xl text-gray-400 w-3/5">
          Elige el nombre del ejercicio del ejercicio del que quieres realizar
          el seguimiento y haz click en crear rutina. Recuerda que el gráfico
          está pensado para que se añada información cada vez que se hace el
          ejercicio.
        </h1>
        <div>
          <input
            type="text"
            name=""
            id=""
            v-model="nombreInput"
            placeholder="Nombre del ejercicio"
            class="w-64 rounded-md mt-4 mb-4"
          />
        </div>
        <button
          class="mt-3 mb-3bg rounded-md p-1 bg-yellow-300 text-zinc-800 hover:bg-yellow-200 transition-all"
          @click="asignarNombreEjercicio"
        >
          Crear Progreso
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { anade, onGetProgreso, deleteProgreso } from "../API/firebase";
import { useDatosStore } from "@/stores/DatosForm";
import { useRouter } from "vue-router";

const nombreInput = ref("");
const datos = useDatosStore();
const router = useRouter();
let progresoId = datos.getIdProgreso;
const progreso = ref([]);

onMounted(() => {
  onGetProgreso("PROGRESO", datos.getUsuario, (docs) => {
    docs.forEach((doc) => {
      datos.guardarIdProgreso(doc.id);
      progreso.value.push(doc.data());
    });
  });
});

const asignarNombreEjercicio = () => {
  if (nombreInput.value == "") {
    alert("El nombre del ejercicio debe completarse");
  } else {
    if (!datos.getIdProgreso) {
      console.log(datos.getUsuario);
      anade("PROGRESO", {
        idUsuario: datos.getUsuario,
        nombre: nombreInput.value,
        dias: [],
        repeticiones: [],
        peso: [],
      });
    }

    router.push({
      name: "Seguimiento progreso",
    });
  }
};

const borrarProgreso = () => {
  deleteProgreso(progresoId);
  progreso.value = [];
  datos.guardarIdProgreso("");
};
</script>

<style scoped>
nav a {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
  border-bottom: 1px solid white;
  margin: 15px;
}
.router-link-active {
  --tw-text-opacity: 1;
  color: rgb(253 224 71 / var(--tw-text-opacity));
}

h1 {
  margin: 0 auto;
}
</style>
