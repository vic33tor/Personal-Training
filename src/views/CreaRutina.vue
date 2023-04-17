<template>
  <div>
    <div class="dia">
      <h1 class="text-white">Lunes</h1>
      <div>
        <input class="mb-3" v-model="num_ejs" type="number" placeholder="1" />
      </div>
      <ul>
        <li v-for="(el, idx) in num_ejs" :key="idx">
          {{ el }}
          <input
            class="mr-2"
            v-model="nombre"
            type="text"
            placeholder="nombre"
          />
          <input v-model="series" type="number" placeholder="numero series" />
        </li>
      </ul>
      <button class="bg-yellow-300 pl-2 pr-2">Añadir</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let num_ejs = ref(0);
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
