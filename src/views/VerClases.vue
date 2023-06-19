<template>
  <div v-if="existe">
    <ul class="place-content-center">
      <li v-for="(clase, idx) in misClases" :key="idx">
        <div class="contenedorTitulo p-6 mb-6">
          <div>
            <h2 class="text-xl font-semibold text-white">{{ clase.nombre }}</h2>
            <p class="text-gray-500 mt-1">
              Hora: {{ clase.inicio }}-{{ clase.fin }}
            </p>

            <p class="text-gray-500 mt-1">Días: {{ clase.dias }}</p>
            <button
              class="mt-3 mb-3bg rounded-md p-1 bg-yellow-300 text-zinc-800 hover:bg-yellow-200 transition-all"
              @click="borrarClase(idx)"
            >
              Eliminar
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div v-else>
    <h2 class="text-xl font-semibold">Todavía no vas a ninguna clase</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onGetClases, deleteClase } from "@/API/firebase";
import { useDatosStore } from "@/stores/DatosForm";
import { arrayRemove } from "firebase/firestore";
const datos = useDatosStore();
const misClases = ref([]);
const existe = ref(false);
onMounted(async () => {
  onGetClases("USUARIOS", (docs) => {
    misClases.value = [];
    docs.forEach((doc) => {
      if (doc.id == datos.getUsuario) {
        misClases.value = doc.data().clases;
      }
    });
  });
  console.log(misClases);
  if (misClases.value === []) {
    existe.value = false;
    console.log("false");
  } else {
    existe.value = true;
    console.log("true");
  }
});
const borrarClase = (index) => {
  deleteClase("USUARIOS", datos.getUsuario, {
    clases: arrayRemove(misClases.value[index]),
  });
  alert("Clase borrada con éxito");
};
</script>

<style scoped>
.contenedorTitulo {
  display: flex;
  justify-content: center;
  background-color: rgb(39 39 42);
  place-content: center;
  width: 75%;
  margin: 0 auto;
  border-radius: 10px;
}
</style>
