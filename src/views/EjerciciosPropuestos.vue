<template>
  <div>
    <ul>
      <li v-for="(ejercicio, idx) in ejercicios" :key="idx">
        <div>
          <span id="músculo">{{ ejercicio.id }}</span>
          <div>
            <ul class="ejercicios">
              <li
                class="elementoEjercicios"
                v-for="(ej, key) in ejercicio.data"
                :key="key"
              >
                <p>{{ ej.Nombre }}</p>
                <p>{{ ej.Enfoque }}</p>
                <div v-if="!textoEj">
                  <img :src="ej.Img" alt="" />
                </div>
                <div v-if="textoEj">
                  {{ ej.Descripción }}
                </div>
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
let textoEj = ref(false);
onGetEjs("EJERCICIOS", (docs) => {
  ejercicios.value = [];
  docs.forEach((doc) => {
    ejercicios.value.push({ id: doc.id, data: doc.data() });
  });
});
</script>

<style scoped>
#músculo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ejercicios {
  display: grid;
  grid-template-columns: 50% 50%;
}
.elementoEjercicios {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.elementoEjercicios > div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 300px;
}
.elementoEjercicios > div > img {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 480px) {
  .ejercicios {
    display: grid;
    grid-template-columns: 90%;
  }
}
</style>
