import { createRouter, createWebHistory } from "vue-router";
import MiInicio from "@/views/MiInicio.vue";
import MiRutina from "@/views/MiRutina.vue";
import EjerciciosPropuestos from "@/views/EjerciciosPropuestos.vue";
import MiProgreso from "@/views/MiProgreso.vue";
import VerRutina from "@/views/VerRutina.vue";
import CreaRutina from "@/views/CreaRutina.vue";

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
      children: [
        {
          //Ahora el path no tiene un / al inicio
          //ya que se añade al path de la ruta padre
          path: "VerRutina",
          name: "Ver tu rutina",
          component: VerRutina,
        },
        {
          path: "CreaRutina",
          name: "Crea tu rutina",
          component: CreaRutina,
        },
      ],
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
