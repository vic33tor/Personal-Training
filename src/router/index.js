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
import ControlProgreso from "@/views/ControlProgreso.vue";
import GraficoProgreso from "@/views/GraficoProgreso.vue";
import { getAuth } from "firebase/auth";

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
        requiresAuth: true,
      },
    },
    {
      path: "/Rutina",
      name: "Rutina",
      component: MiRutina,
      redirect: { name: "Crea tu rutina" },
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          //Ahora el path no tiene un / al inicio
          //ya que se añade al path de la ruta padre
          path: "VerRutina",
          name: "Ver tu rutina",
          component: VerRutina,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "CreaRutina",
          name: "Crea tu rutina",
          component: CreaRutina,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "Clases",
          name: "Ver tus clases",
          component: VerClases,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/Ejercicios-Propuestos",
      name: "Ejercicios",
      component: EjerciciosPropuestos,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/Progreso",
      name: "Progreso",
      component: MiProgreso,
      redirect: { name: "Control de progreso" },
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          //Ahora el path no tiene un / al inicio
          //ya que se añade al path de la ruta padre
          path: "ControlProgreso",
          name: "Control de progreso",
          component: ControlProgreso,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "SeguimientoProgreso",
          name: "Seguimiento progreso",
          component: GraficoProgreso,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/Recetas",
      name: "MisRecetas",
      component: MisRecetas,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/RecetaInfo",
      name: "RecetaInfo",
      component: RecetaInfo,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/Servicios",
      name: "Servicios",
      component: MisVarios,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/MisClases",
      name: "MisClases",
      component: MisClases,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/MisMonitores",
      name: "MisMonitores",
      component: MisMonitores,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/InfoMonitor",
      name: "InfoMonitor",
      component: InfoMonitor,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/InfoClase",
      name: "InfoClase",
      component: InfoClase,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getAuth().currentUser) {
      next();
    } else {
      alert("No tienes acceso");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
