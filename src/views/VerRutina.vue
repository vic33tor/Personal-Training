<template>
  <div>
    <div class="text-center text-2xl mt-2">
      <select
        v-model="opciones"
        class="mt-2 p-1 text-gray-500 rounded-md text-center"
      >
        <option value="">Todos</option>
        <option value="Lunes">Lunes</option>
        <option value="Martes">Martes</option>
        <option value="Miercoles">Miercoles</option>
        <option value="Jueves">Jueves</option>
        <option value="Viernes">Viernes</option>
        <option value="Sábado">Sábado</option>
        <option value="Domingo">Domingo</option>
      </select>
    </div>
    <div v-if="existe" class="rutina">
      <ul class="w-full" :class="{ dia_completo: !showSecondUl }">
        <li class="w-full" v-for="(dia, idx) in rutinaFiltro" :key="idx">
          <div v-if="Object.prototype.toString.call(dia) === `[object Object]`">
            <div v-if="!idx" class="nombre_dia text-white">{{ opciones }}</div>
            <div class="nombre_musculo text-white">{{ dia.nombre_dia }}</div>
            <div v-for="(ej, idx) in rutinaFiltro" :key="idx">
              <div class="ejercicio" v-if="dia.nombre_dia">
                <span class="items-start text-gray-500 mt-4 mb-4">{{
                  ej.nombre
                }}</span>
                <span
                  v-if="ej.series != undefined"
                  class="items-end text-gray-500"
                  >{{ ej.series + " series" }}</span
                >
              </div>
            </div>
          </div>
          <div v-else class="w-full">
            <ul :class="{ dia_completo: showSecondUl }">
              <div class="nombre_dia text-white">{{ idx }}</div>
              <li
                class="nombre_musculo text-white"
                v-for="(ej, idx) in dia"
                :key="idx"
              >
                {{ ej.nombre_dia }}
              </li>
              <li class="ejercicio" v-for="(ej, idx) in dia" :key="idx">
                <span class="items-start text-gray-500">{{ ej.nombre }}</span>
                <span
                  v-if="ej.series != undefined"
                  class="items-end text-gray-500"
                  >{{ ej.series + " series" }}</span
                >
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <h2 class="text-xl font-semibold">
        Todavía no has creado ninguna rutina
      </h2>
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
const existe = ref(false);
const showSecondUl = ref(true);
onMounted(async () => {
  onGetRutina("RUTINAS", datos.getUsuario, (docs) => {
    docs.forEach((doc) => {
      miRutina.value = [];
      const { user_id, ...datosRestantes } = doc.data();
      miRutina.value.push(datosRestantes);
      ordenados.value = Object.fromEntries(
        Object.entries(miRutina.value[0]).sort(([dayA], [dayB]) => {
          const order = [
            "Lunes",
            "Martes",
            "Miércoles",
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
  if (miRutina.value === []) {
    existe.value = false;
    console.log("false");
  } else {
    existe.value = true;
    console.log("true");
  }
});
const rutinaFiltro = computed(() => {
  if (!opciones.value) {
    toggleShowSecondUlTrue();
    if (Object.entries(ordenados.value).length === 0) {
      let descanso = { "Aún no ha creado ninguna rutina": 2 };
      return descanso;
    } else {
      return ordenados.value;
    }
  } else {
    toggleShowSecondUlFalse();
    const claves = Object.keys(miRutina.value[0]);
    console.log(miRutina.value[0]);
    console.log(claves);
    if (claves.includes(opciones.value)) {
      return miRutina.value[0][opciones.value];
    } else {
      let descanso = { "Este día no tiene nada seleccionado": 2 };
      return descanso;
    }
  }
});
const toggleShowSecondUlTrue = () => {
  showSecondUl.value = true;
};
const toggleShowSecondUlFalse = () => {
  showSecondUl.value = false;
};
</script>

<style scoped>
.nombre_dia {
  text-align: center;
  font-size: x-large;
  margin-top: 8px;
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
  font-size: large;
  font-weight: 600;
}
.ejercicio {
  display: flex;
  flex-direction: row;
  align-items: center;
  place-content: center;
  gap: 30px;
}

.dia_completo {
  width: 100%;
  border-radius: 10px;
  background-color: rgb(39 39 42);
}
</style>
