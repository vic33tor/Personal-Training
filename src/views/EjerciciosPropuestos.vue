<template>
  <div>
    <ul>
      <li v-for="(ejercicio, idx) in ejercicios" :key="idx">
        <div>
          <span>{{ ejercicio.id }}</span>
          <div>
            <ul>
              <li v-for="(ej, key) in ejercicio.data" :key="key">
                {{ ej.Nombre }}
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onGetEjs } from "@/API/firebase";
let ejercicios = ref([]);
onGetEjs("EJERCICIOS", (docs) => {
  ejercicios.value = [];
  docs.forEach((doc) => {
    ejercicios.value.push({ id: doc.id, data: doc.data() });
  });
});
</script>

<style scoped></style>
