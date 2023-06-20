<template>
  <div>
    <h1 class="text-crear-rutina text-1xl text-gray-400">
      Para crear tu rutina lo que tienes que hacer es rellenar día a día los
      ejercicios que realizarás, marcando el número de ejercicios, sus
      respectivos nombres y número de series. Una vez finalizado dale al botón
      de añadir y continúa con los demás días.
    </h1>
    <h1 class="text-crear-rutina text-1xl text-gray-400">
      Si quieres editar un día de tu rutina, tienes que rellenar el día con los
      ejercicios que ya están incluidos y los nuevos que quieras añadir. Para
      borrar un día, simplemente selecciona el día que quieras borrar y haz
      click en el botón de eliminar
    </h1>

    <div class="dia rounded-md bg-zinc-800">
      <h1 class="text-xl font-semibold text-white">Día de la semana</h1>
      <select v-model="opciones" class="p-1 mb-8 text-gray-500">
        <option>Lunes</option>
        <option>Martes</option>
        <option>Miercoles</option>
        <option>Jueves</option>
        <option>Viernes</option>
        <option>Sabado</option>
        <option>Domingo</option>
      </select>
      <h1 class="text-xl font-semibold text-white">Grupos musculares</h1>
      <input
        class="w-64 rounded-md mt-1 mb-4 h-8"
        v-model="nombre_musculo"
        placeholder="Pecho y tríceps"
      />
      <h1 class="text-xl font-semibold text-white">Número de ejercicios</h1>
      <input
        class="w-64 rounded-md mt-1 mb-4 h-8"
        v-model="num_ejs"
        type="number"
        placeholder="1"
      />
      <ul>
        <li v-for="(el, index) in num_ejs" :key="index">
          <span class="text-xl text-white font-semibold mr-2">{{
            index + 1
          }}</span>
          <input
            class="mr-2 p-1 text-gray-500 rounded-md"
            :name="'nombre-' + index + 1"
            type="text"
            placeholder="nombre"
            v-model="nombres[index]"
          />
          <input
            class="p-1 text-gray-500 rounded-md"
            :name="'series' + index + 1"
            type="number"
            placeholder="numero series"
            v-model="series[index]"
          />
        </li>
      </ul>

      <div class="botones">
        <button
          class="rounded-md p-1 bg-yellow-300 text-zinc-800 hover:bg-yellow-200 transition-all m-2"
          @click="anhadirDia"
        >
          Añadir
        </button>
        <button
          class="rounded-md p-1 bg-yellow-300 text-zinc-800 hover:bg-yellow-200 transition-all m-2"
          @click="borrarDia"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { anade, updateRutina } from "@/API/firebase";
import { onGetRutina } from "@/API/firebase";
import { useDatosStore } from "@/stores/DatosForm";
import { deleteField } from "firebase/firestore";
const datos = useDatosStore();
const opciones = ref("Lunes");
onMounted(async () => {
  console.log(datos.getRutina);
  if (!datos.getRutina) {
    console.log(datos.getUsuario);
    anade("RUTINAS", { user_id: datos.getUsuario });
    onGetRutina("RUTINAS", datos.getUsuario, (docs) => {
      docs.forEach((doc) => {
        datos.guardarRutina(doc.id);
      });
    });
  }
});
let nombre_musculo = ref("");
let num_ejs = ref(0);
let nombres = ref([]);
let series = ref([]);
const anhadirDia = () => {
  let rutina = [];
  for (let i = 0; i < num_ejs.value; i++) {
    const nombre = nombres.value[i];
    const serie = series.value[i];
    rutina.push({ nombre: nombre, series: serie });
  }
  rutina.push({ nombre_dia: nombre_musculo.value });
  updateRutina("RUTINAS", datos.getRutina, {
    [opciones.value]: rutina,
  });
  num_ejs.value = 0;
  nombre_musculo.value = "";
  alert("Día añadido con éxito");
};
const borrarDia = () => {
  updateRutina("RUTINAS", datos.getRutina, {
    [opciones.value]: deleteField(),
  });
  num_ejs.value = 0;
  nombre_musculo.value = "";
  alert("Día borrado con éxito");
};
</script>

<style scoped>
.dia {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-left: 4em;
  margin-right: 4em;
  padding: 1em;
}
.text-crear-rutina {
  display: flex;
  align-items: center;
  margin-left: 4em;
  margin-right: 4em;
  padding: 10px;
  text-align: center;
}
.botones {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.dia h1 {
  margin-bottom: 1em;
}
.dia ul > li {
  margin-bottom: 1em;
}
</style>
