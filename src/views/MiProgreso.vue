<template>
  <div class="h-96 items-center content-center text-center">
    <h1 class="text-4xl text-white mt-2 mb-2">Mi Progreso</h1>
    <button @click="prueba">asd</button>
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
    <button>Confirmar</button>
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

import { onGetProgreso } from "../API/firebase";
import { getAuth } from "firebase/auth";

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement
);

export default {
  setup() {
    const progreso = ref([]);
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
          data: [70, 72, 71, 73, 75],
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
      console.log(progreso.value[0].progreso.repeticiones);
    };

    const dameProgreso = () => {
      console.log();

      onGetProgreso("USUARIOS", aut.currentUser.email, (docs) => {
        docs.forEach((doc) => {
          const usuario = doc.data();
          progreso.value.push(usuario);
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
    };
  },
};
</script>

<style>
canvas {
  width: 60%;
  height: 300px;
}
</style>
