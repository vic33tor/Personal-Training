<template>
  <div>
    <h1>
      Aqui vas a crear tu rutina, indica los ejercicios que quieres hacer en un
      determinado díaa, selecciona el día y añadelo a tu rutina
    </h1>
    <div class="dia">
      <h1>Nombre del dia</h1>
      <input
        class="mb-3"
        v-model="nombre_musculo"
        placeholder="Pecho y triceps"
      />
      <h1>Numero de ejercicios</h1>
      <input class="mb-3" v-model="num_ejs" type="number" placeholder="1" />
      <ul>
        <li v-for="(el, index) in num_ejs" :key="index">
          {{ index + 1 }}
          <input
            class="mr-2"
            :name="'nombre-' + index + 1"
            type="text"
            placeholder="nombre"
            v-model="nombres[index]"
          />
          <input
            :name="'series' + index + 1"
            type="number"
            placeholder="numero series"
            v-model="series[index]"
          />
        </li>
      </ul>
      <h1>Dia de la semana</h1>
      <select v-model="opciones" class="p-1 mb-4">
        <option>Lunes</option>
        <option>Martes</option>
        <option>Miercoles</option>
        <option>Jueves</option>
        <option>Viernes</option>
        <option>Sabado</option>
        <option>Domingo</option>
      </select>
      <button class="bg-yellow-300 pl-2 pr-2" @click="anhadirDia">
        Añadir
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { anade, updateRutina, onGetRutina } from "@/API/firebase";
import { useDatosStore } from "@/stores/DatosForm";
const datos = useDatosStore();
const opciones = ref("");
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
};
</script>

<style scoped>
.dia {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid white;
  margin-left: 4em;
  margin-right: 4em;
  padding: 1em;
}
.dia h1 {
  margin-bottom: 1em;
}
.dia ul > li {
  margin-bottom: 1em;
}
</style>
