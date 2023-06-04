<template>
  <div class="h-96 items-center content-center text-center">
    <h1 class="text-4xl text-white mt-2 mb-2">Mi Progreso</h1>
    <button @click="prueba">asd</button>
    <div class="botonera flex flex-row gap-5 mb-4">
      <h1 class="text-white">
        Introduce tus datos de entrenamiento diario aqui:
      </h1>
      <div>
        <input
          class="input-field"
          type="text"
          placeholder="Repeticiones"
          v-model="repeticionesInput"
        />
      </div>
      <div>
        <input
          class="input-field"
          type="text"
          placeholder="Peso"
          v-model="pesoInput"
        />
      </div>
      <button @click="actualizarProgreso">Confirmar</button>
    </div>

    <canvas ref="chartCanvas" class="bg-opacity-90 bg-white"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
} from "chart.js";

import { onGetProgreso, updateProgreso } from "../API/firebase";
import { getAuth } from "firebase/auth";
import { useDatosStore } from "@/stores/DatosForm";

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement
);

export default {
  setup() {
    let progreso = ref([]);
    const diasProgreso = ref([]);
    const repeticionesProgreso = ref([]);
    const pesosProgreso = ref([]);
    const datos = useDatosStore();

    const chartCanvas = ref(null);
    const repeticionesInput = ref("");
    const pesoInput = ref("");
    let chartInstance = null;
    let aut;

    const chartData = {
      labels: [],
      datasets: [
        {
          label: "Repeticiones",
          borderColor: "green",
          fill: true,
        },
        {
          label: "Peso",
          borderColor: "red",
          fill: false,
        },
      ],
    };

    onMounted(() => {
      aut = getAuth();
      dameProgreso();
      chartInstance = new Chart(chartCanvas.value.getContext("2d"), {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Días de entrenamiento",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Repeticiones y peso",
              },
              beginAtZero: true,
            },
          },
        },
      });
    });

    const prueba = () => {
      console.log(diasProgreso.value);
    };

    const actualizarProgreso = () => {
      repeticionesProgreso.value[0].push(repeticionesInput);
      pesosProgreso.value[0].push(pesoInput);
      diasProgreso.value[0].push(3);
      progreso.value = {
        dias: diasProgreso.value[0],
        pesos: pesosProgreso.value[0],
        repeticiones: repeticionesProgreso.value[0],
      };
      updateProgreso("USUARIOS", datos.getUsuario, {
        progreso,
      }); /**Acabar */
      dameProgreso();
    };

    const dameProgreso = () => {
      console.log();

      onGetProgreso("USUARIOS", aut.currentUser.email, (docs) => {
        docs.forEach((doc) => {
          const usuario = doc.data();
          progreso.value.push(usuario);
          diasProgreso.value.push(usuario.progreso.dias);
          repeticionesProgreso.value.push(usuario.progreso.repeticiones);
          pesosProgreso.value.push(usuario.progreso.peso);
          chartData.datasets[0].data = usuario.progreso.repeticiones;
          chartData.datasets[1].data = usuario.progreso.peso;
          chartData.labels = usuario.progreso.dias;
        });
        chartInstance.update();
      });
    };

    return {
      chartCanvas,
      prueba,
      progreso,
      repeticionesInput,
      pesoInput,
      actualizarProgreso,
    };
  },
};
</script>

<style>
canvas {
  width: 60%;
  height: 300px;
}

.botonera {
  margin: 0 auto;
  text-align: center;
  justify-content: center;
  place-content: center;
}
</style>
