<template>
  <div>
    <div class="text-center text-white text-2xl mt-2">
      <select v-model="opciones" class="mt-2 text-black rounded-md text-center">
        <option value="">Todos</option>
        <option value="Lunes">Lunes</option>
        <option value="Martes">Martes</option>
        <option value="Miercoles">Miércoles</option>
        <option value="Jueves">Jueves</option>
        <option value="Viernes">Viernes</option>
        <option value="Sábado">Sábado</option>
        <option value="Domingo">Domingo</option>
      </select>
    </div>
    <div class="rutina">
      <ul class="w-full" :class="{ dia_completo: !showSecondUl }">
        <li class="w-full" v-for="(dia, idx) in rutinaFiltro" :key="idx">
          <div v-if="Object.prototype.toString.call(dia) === `[object Object]`">
            <div v-if="!idx" class="nombre_dia">{{ opciones }}</div>
            <div class="nombre_musculo">
              {{ dia.nombre_dia }}
            </div>
            <div v-for="(ej, idx) in rutinaFiltro" :key="idx">
              <div class="ejercicio" v-if="dia.nombre_dia">
                <span>{{ ej.nombre }}</span>
                <span>{{ ej.series }}</span>
              </div>
            </div>
          </div>
          <div v-else class="w-full">
            <ul :class="{ dia_completo: showSecondUl }">
              <div class="nombre_dia">{{ idx }}</div>
              <li class="nombre_musculo" v-for="(ej, idx) in dia" :key="idx">
                {{ ej.nombre_dia }}
              </li>
              <li class="ejercicio" v-for="(ej, idx) in dia" :key="idx">
                <span>{{ ej.nombre }}</span>
                <span>{{ ej.series }}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { onGetRutina } from "@/API/firebase";
import { useDatosStore } from "@/stores/DatosForm";
const datos = useDatosStore();
const miRutina = ref([]);
const opciones = ref("");
const ordenados = ref({});
const showSecondUl = ref(true);
onMounted(async () => {
  onGetRutina("RUTINAS", datos.getUsuario, (docs) => {
    docs.forEach((doc) => {
      const { user_id, ...datosRestantes } = doc.data();
      miRutina.value.push(datosRestantes);
      ordenados.value = Object.fromEntries(
        Object.entries(miRutina.value[0]).sort(([dayA], [dayB]) => {
          const order = [
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
            "Domingo",
          ];
          return order.indexOf(dayA) - order.indexOf(dayB);
        })
      );
    });
  });
});
const rutinaFiltro = computed(() => {
  if (!opciones.value) {
    toggleShowSecondUl();
    return ordenados.value;
  } else {
    toggleShowSecondUl();
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
const toggleShowSecondUl = () => {
  showSecondUl.value = !showSecondUl.value;
};
</script>

<style scoped>
.nombre_dia {
  text-align: center;
  font-size: xx-large;
}
.rutina {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 4em;
  margin-right: 4em;
  padding: 1em;
}

.nombre_musculo {
  text-align: center;
  font-size: x-large;
}
.ejercicio {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.dia_completo {
  width: 100%;
  border: 1px solid white;
}
</style>