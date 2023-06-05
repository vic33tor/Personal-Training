import { createRouter, createWebHistory } from "vue-router";
import MiInicio from "@/views/MiInicio.vue";
import MiRutina from "@/views/MiRutina.vue";
import EjerciciosPropuestos from "@/views/EjerciciosPropuestos.vue";
import MiProgreso from "@/views/MiProgreso.vue";
import VerRutina from "@/views/VerRutina.vue";
import CreaRutina from "@/views/CreaRutina.vue";
import LogIn from "@/views/LogIn.vue";

import MisRecetas from "@/views/MisRecetas.vue";
import RecetaInfo from "../views/RecetaInfo.vue";
import MisVarios from "../views/MisVarios.vue";
import MisClases from "../views/MisClases.vue";
import MisMonitores from "../views/MisMonitores.vue";
import InfoMonitor from "../views/InfoMonitor.vue";
import InfoClase from "../views/InfoClase.vue";
import VerClases from "../views/VerClases.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LogIn,
    },
    {
      path: "/home",
      name: "Inicio",
      component: MiInicio,
      meta: {
        retquiresAuth: true,
      },
    },
    {
      path: "/Rutina",
      name: "Rutina",
      component: MiRutina,
      redirect: { name: "Crea tu rutina" },
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
        {
          path: "Clases",
          name: "Ver tus clases",
          component: VerClases,
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
    {
      path: "/Recetas",
      name: "MisRecetas",
      component: MisRecetas,
    },
    {
      path: "/RecetaInfo",
      name: "RecetaInfo",
      component: RecetaInfo,
      props: true,
    },
    {
      path: "/Servicios",
      name: "Servicios",
      component: MisVarios,
    },
    {
      path: "/MisClases",
      name: "MisClases",
      component: MisClases,
    },
    {
      path: "/MisMonitores",
      name: "MisMonitores",
      component: MisMonitores,
    },
    {
      path: "/InfoMonitor",
      name: "InfoMonitor",
      component: InfoMonitor,
      props: true,
    },
    {
      path: "/InfoClase",
      name: "InfoClase",
      component: InfoClase,
      props: true,
    },
  ],
});

export default router;
