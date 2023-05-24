import { createRouter, createWebHistory } from "vue-router";
import MiInicio from "@/views/MiInicio.vue";
import MiRutina from "@/views/MiRutina.vue";
import EjerciciosPropuestos from "@/views/EjerciciosPropuestos.vue";
import MiProgreso from "@/views/MiProgreso.vue";
import VerRutina from "@/views/VerRutina.vue";
import CreaRutina from "@/views/CreaRutina.vue";
import LogIn from "@/views/LogIn.vue";
import SignUp from "@/views/SignUp.vue";
import MisRecetas from "@/views/MisRecetas.vue";
import RecetaInfo from "../views/RecetaInfo.vue";
import MisVarios from "../views/MisVarios.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LogIn,
    },
    {
      path: "/Resgistrase",
      name: "SignUp",
      component: SignUp,
    },
    {
      path: "/home",
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
    {
      path: "/Recetas",
      name: "MisRecetas",
      component: MisRecetas,
    },
    {
      path: "/RecetaInfo",
      name: "RecetaInfo",
      component: RecetaInfo,
      props: true
    },
    {
      path: "/Varios",
      name: "Varios",
      component: MisVarios,
      props: true
    },
  ],
});

export default router;
