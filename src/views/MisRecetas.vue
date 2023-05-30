<template>
  <div class="shortText">
    <h1 class="solo">Nuestras</h1>
    <h1 class="name">recetas fit</h1>
  </div>
  <div class="recetasContainer">
    <ul v-for="item in recetas" :key="item.id">
      <li class="receta" @click="verUnaReceta(item.id)">
        <div class="rounded-lg flex mr-3">
          <div class="w-fit">
            <img :src="item.Img" alt="" />
          </div>
        </div>
        <div class="contenidoReceta">
          <div class="w-full bg-slate-500 rounded-sm">
            <h1>{{ item.Nombre }}</h1>
          </div>
          <h2>{{ item.ShortDesc }}</h2>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

import { ref, onMounted } from "vue";
const recetas = ref([]);
import { onDameReceta } from "../API/firebase";

const router = useRouter();
onMounted(() => {
  dameRecetas();
});

const dameRecetas = () => {
  onDameReceta("RECETAS", (docs) => {
    recetas.value = [];
    docs.forEach((doc) => {
      recetas.value.push({ id: doc.id, ...doc.data() });
    });
  });
};

const verUnaReceta = (id) => {
  router.push({
    name: "RecetaInfo",
    query: { id: id },
  });
};
</script>

<style coped>
li {
  margin-top: 20px;
  margin-bottom: 20px;
}
.recetasContainer {
  margin: 0 auto;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 70%;
  margin-top: 16px;
  margin-bottom: 16px;
  min-height: 1250px;

}

.receta {
  height: fit-content;
  border: solid 1px white;
  padding: 6px;
  box-shadow: 0 4px 8px 0 rgba(162, 255, 0, 0.2);
  transition: 0.3s;
  color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
}

.receta:hover {
  box-shadow: 0 15px 16px 0 rgba(229, 255, 0, 0.2);
  transform: scale(1.02);
}

.contenidoReceta {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
}

.shortText {
  display: flex;
  gap: 5px;
  font-size: 40px;
}

.solo {
  color: white;
}

.name {
  color: yellow;
}
</style>
