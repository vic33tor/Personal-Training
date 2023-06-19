<template>
  <div class="contenedorMonitor rounded-xl shadow-md overflow-hidden">
    <div class="w-4/4">
      <img :src="claseActual.img" alt="Imagen del clase" class="w-full" />
    </div>
    <div class="contenedorTitulo p-6 mb-6">
      <div>
        <h2 class="text-xl font-semibold">{{ claseActual.nombre }}</h2>

        <p class="text-gray-500 mt-1">
          Hora: {{ claseActual.horaInicio }}-{{ claseActual.horaFin }}
        </p>
        <p class="text-gray-500 mt-1">Días: {{ diasClase }}</p>
      </div>
      <div></div>
    </div>

    <div class="items-end content-end text-right">
      <button
        @click="asistirClase(claseActual)"
        class="bg-yellow-300 rounded-md px-4 py-2 hover:bg-yellow-200 w-4/12 mr-8 transition-colors"
      >
        Asistir
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { onDameReceta, updateClasesContratadas } from "../API/firebase";
import { useRoute, useRouter } from "vue-router";
import { useDatosStore } from "@/stores/DatosForm";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const asistirClase = (claseActual) => {
  const auth = getAuth();

  // Verifica si el usuario está autenticado antes de continuar
  onAuthStateChanged(auth, (user) => {
    if (user) {
      updateClasesContratadas("USUARIOS", datos.getUsuario, {
        nombre: claseActual.nombre,
        dias: claseActual.dias,
        inicio: claseActual.horaInicio,
        fin: claseActual.horaFin,
      });
    } else {
      console.log("Usuario no autenticado");
    }
  });
};

const datos = useDatosStore();
const route = useRoute();
const router = useRouter();
const claseActual = ref([]);
let diasClase = ref("");

onMounted(() => {
  dameClase(route.query.id);
});

const dameClase = (id) => {
  onDameReceta("CLASES", (docs) => {
    docs.forEach((doc) => {
      if (doc.id === id) {
        claseActual.value = { id: doc.id, ...doc.data() };
        diasClase.value = claseActual.value.dias.join(" y ");
      }
    });
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
  margin-bottom: 90px;
}

.contenedorTitulo {
  display: flex;
  justify-content: space-between;
}
</style>
