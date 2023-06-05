<template>
  <div>
    <div class="text-center text-white text-2xl mt-2">
      <select v-model="opciones" class="mt-2 text-black rounded-md">
        <option value="">Todos</option>
        <option value="Biceps">Biceps</option>
        <option value="Espalda">Espalda</option>
        <option value="Hombro">Hombro</option>
        <option value="Pecho">Pecho</option>
        <option value="Pierna">Pierna</option>
        <option value="Triceps">Triceps</option>
      </select>
    </div>
    <ul>
      <li v-for="(ejercicio, idx) in ejsFiltro" :key="idx">
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
                <div class="imagenEjercicios">
                  <img :src="ej.Img" alt="" />
                </div>
                <div class="textoEjercicios">
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
import { ref, computed } from "vue";
import { onGetEjs } from "@/API/firebase";
let ejercicios = ref([]);
const opciones = ref("");
onGetEjs("EJERCICIOS", (docs) => {
  ejercicios.value = [];
  docs.forEach((doc) => {
    ejercicios.value.push({ id: doc.id, data: doc.data() });
  });
});
const ejsFiltro = computed(() => {
  if (!opciones.value) {
    return ejercicios.value;
  } else {
    return ejercicios.value.filter((x) => {
      return x.id === opciones.value;
    });
  }
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
  grid-template-columns: 49% 49%;
}
.elementoEjercicios {
  transition: 0.3s;
  padding: 10px;
  color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.elementoEjercicios:hover {
  transform: scale(1.01);
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
.textoEjercicios {
  z-index: 9;
  position: absolute;
}

.imagenEjercicios {
  border-radius: 10px;
  z-index: 10;
  box-shadow: 2px 8px 16px 2px rgba(251, 255, 0, 0.2);
}

.imagenEjercicios:hover {
  box-shadow: 0 15px 16px 0 rgba(229, 255, 0, 0.2);
  transition: 1s;
  opacity: 10%;
}

@media screen and (max-width: 480px) {
  .ejercicios {
    display: grid;
    grid-template-columns: 90%;
  }
}
</style>
