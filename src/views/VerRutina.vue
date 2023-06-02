<template>
  <div>
    <div class="text-center text-white text-2xl mt-2">
      <select v-model="opciones" class="mt-2 text-black rounded-md text-center">
        <option value="">Todos</option>
        <option value="Lunes">Lunes</option>
        <option value="Martes">Martes</option>
        <option value="Miércoles">Miércoles</option>
        <option value="Jueves">Jueves</option>
        <option value="Viernes">Pierna</option>
        <option value="Sábado">Sábado</option>
        <option value="Domingo">Domingo</option>
      </select>
    </div>
    <ul>
      {{
        opciones
      }}
      <li v-for="(dia, idx) in rutinaFiltro" :key="idx">
        <div v-if="Object.prototype.toString.call(dia) === `[object Object]`">
          {{ dia }}
        </div>
        <div v-else>
          <ul>
            {{
              idx
            }}
            <li v-for="(ej, idx) in dia" :key="idx">
              {{ ej }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { onGetRutina } from "@/API/firebase";
import { useDatosStore } from "@/stores/DatosForm";
const datos = useDatosStore();
const miRutina = ref([]);
const opciones = ref("");
onMounted(async () => {
  if (datos.getRutina) {
    onGetRutina("RUTINAS", datos.getUsuario, (docs) => {
      docs.forEach((doc) => {
        const { user_id, ...datosRestantes } = doc.data();
        miRutina.value.push(datosRestantes);
      });
    });
  }
});
const rutinaFiltro = computed(() => {
  if (!opciones.value) {
    return miRutina.value[0];
  } else {
    const claves = Object.keys(miRutina.value[0]);
    console.log(miRutina.value[0]);
    console.log(claves);
    if (claves.includes(opciones.value)) {
      return miRutina.value[0][opciones.value];
    } else {
      return "Descanso";
    }
  }
});
</script>

<style scoped></style>
