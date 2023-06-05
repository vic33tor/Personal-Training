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
          type="number"
          placeholder="Repeticiones"
          v-model="repeticionesInput"
        />
      </div>
      <div>
        <input
          class="input-field"
          type="number"
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

import { onGetProgreso, updateProgreso, anade } from "../API/firebase";
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
      if (!datos.getIdProgreso) {
        console.log(datos.getUsuario);
        anade("PROGRESO", {
          idUsuario: datos.getUsuario,
          dias: [],
          repeticiones: [],
          peso: [],
        });
        onGetProgreso("PROGRESO", datos.getUsuario, (docs) => {
          docs.forEach((doc) => {
            datos.guardarIdProgreso(doc.id);
          });
        });
      }
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
