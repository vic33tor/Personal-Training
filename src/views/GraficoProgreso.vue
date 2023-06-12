<template>
  <div v-show="datos.getIdProgreso" class="">
    <div class="h-96 items-center content-center text-center">
      <h1 class="text-4xl text-white mt-2 mb-2">
        Mi Progreso de: {{ progresoUsuario.nombre }}
      </h1>
      <div class="flex justify-center gap-5 mb-4 mt-4">
        <div>
          <input
            class="input-field rounded-md p-1"
            type="number"
            placeholder="Repeticiones"
            v-model="repeticionesInput"
          />
        </div>
        <div>
          <input
            class="input-field rounded-md p-1"
            type="number"
            placeholder="Peso"
            v-model="pesoInput"
          />
        </div>
      </div>
      <button
        class="mb-4 bg-yellow-300 rounded-md p-1 text-zinc-800 hover:bg-yellow-200 transition-all w-48"
        @click="actualizarProgreso"
      >
        <h1 class="">Agregar datos</h1>
      </button>
      <canvas ref="chartCanvas" class="bg-opacity-90 bg-white"></canvas>
    </div>
  </div>
  <div
    v-show="!datos.getIdProgreso"
    class="place-content-center text-center items-center"
  >
    <h1 class="text-4xl text-white mt-2 mb-2 w-2/4">
      Debes crear tu progreso para viusalizarlo. Hazlo en el apartado "Control
      de progreso"
    </h1>
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
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { onGetProgreso, updateProgreso, anade } from "../API/firebase";
import { getAuth } from "firebase/auth";
import { useDatosStore } from "@/stores/DatosForm";

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default {
  setup() {
    let progreso = ref({ dias: [], peso: [], repeticiones: [] });

    let progresoUsuario = ref({
      dias: [],
      repeticiones: [],
      peso: [],
    });
    let progresoId = ref("");
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
          backgroundColor: "rgba(0, 128, 0, 0.3)",
          tension: 0.25,
          fill: true,
        },
        {
          label: "Peso",
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.3)",
          tension: 0.25,
          fill: true,
        },
      ],
    };

    onMounted(() => {
      aut = getAuth();
      dameProgreso();
      onGetProgreso("PROGRESO", datos.getUsuario, (docs) => {
        docs.forEach((doc) => {
          datos.guardarIdProgreso(doc.id);
        });
      });

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
                color: "gray",
                font: {
                  size: 16,
                },
              },
              ticks: {
                color: "gray",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Repeticiones (n) y peso (kg)",
                color: "gray",
                font: {
                  size: 16,
                },
              },
              ticks: {
                color: "gray",
              },
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: "top",
              labels: {
                color: "gray",
                font: {
                  size: 14,
                },
              },
            },
          },
        },
      });
    });

    const dameProgreso = () => {
      onGetProgreso("PROGRESO", datos.getUsuario, (docs) => {
        docs.forEach((doc) => {
          progresoUsuario.value = doc.data();
          progresoId.value = doc.id;

          chartData.datasets[0].data = progresoUsuario.value.repeticiones;
          chartData.datasets[1].data = progresoUsuario.value.peso;
          chartData.labels = progresoUsuario.value.dias;
        });
        chartInstance.update();
      });
    };

    const prueba = () => {
      console.log(progresoUsuario);
    };

    const actualizarProgreso = () => {
      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido);

      const progresoUsuarioActualizado = {
        dias: [...progresoUsuario.value.dias, hoy.toLocaleDateString()],
        peso: [...progresoUsuario.value.peso, pesoInput.value],
        repeticiones: [
          ...progresoUsuario.value.repeticiones,
          repeticionesInput.value,
        ],
      };
      progresoUsuario.value = progresoUsuarioActualizado;

      updateProgreso("PROGRESO", progresoId.value, {
        dias: progresoUsuario.value.dias,
        peso: progresoUsuario.value.peso,
        repeticiones: progresoUsuario.value.repeticiones,
      });

      dameProgreso();
    };

    return {
      chartCanvas,
      prueba,
      progreso,
      repeticionesInput,
      pesoInput,
      actualizarProgreso,
      progresoUsuario,
      aut,
      datos,
    };
  },
};
</script>

<style>
.botonera {
  margin: 0 auto;
  text-align: center;
  justify-content: center;
  place-content: center;
}

.chart-canvas {
  width: 100%; /* Ajusta el ancho del gráfico */
  height: 400px; /* Ajusta la altura del gráfico */
  /* Agrega otros estilos personalizados según tus necesidades */
}
</style>
