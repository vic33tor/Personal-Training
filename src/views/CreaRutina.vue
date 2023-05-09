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
        <li v-for="(el, index) in lista_ejs" :key="index">
          {{ index + 1 }}
          <input
            class="mr-2"
            v-model="lista_ejs.nombre"
            :name="'nombre-' + index"
            type="text"
            placeholder="nombre"
          />
          <input
            v-model="lista_ejs.series"
            :name="'series' + index"
            type="number"
            placeholder="numero series"
          />
        </li>
      </ul>
      <h1>Dia de la semana</h1>
      <select class="p-1 mb-4">
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
import { ref, onMounted, watch } from "vue";
import { anade, editar, onLogIn } from "@/API/firebase";
import { useDatosStore } from "@/stores/DatosForm";
const datos = useDatosStore();
onMounted(async () => {
  let id;
  onLogIn("USUARIOS", datos.getUsuario, (docs) => {
    docs.forEach((doc) => {
      id = doc.id;
    });
  });
  anade("RUTINAS", { id: id.value });
});
let num_ejs = ref(0);
let lista_ejs = ref([]);
watch(
  () => num_ejs,
  (value) => {
    lista_ejs.value = new Array(value).fill({ nombre: "", series: "" });
  }
);
const anhadirDia = () => {
  
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
