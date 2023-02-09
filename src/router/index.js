import { createRouter, createWebHistory } from "vue-router";
import MiInicio from "@/views/MiInicio.vue";
import MiRutina from "@/views/MiRutina.vue";
import EjerciciosPropuestos from "@/views/EjerciciosPropuestos.vue";
import MiProgreso from "@/views/MiProgreso.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Inicio",
      component: MiInicio,
    },
    {
      path: "/Rutina",
      name: "Rutina",
      component: MiRutina,
    },
    {
      path: "/Ejercicios-Propuestos",
      name: "Ejercicios",
      component: EjerciciosPropuestos,
    },
    {
      path: "/Progreso",
      name: "Progreso",
      component: MiProgreso,
    },
  ],
});

export default router;
