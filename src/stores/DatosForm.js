import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useDatosStore = defineStore(
  "datos",
  () => {
    const id_usuario = ref("");
    const id_rutina = ref("");
    const is_login = ref(false);
    const id_progreso = ref(undefined);
    const tieneMonitor = ref("");

    const getUsuario = computed(() => id_usuario.value);
    const getRutina = computed(() => id_rutina.value);
    const getIsLogin = computed(() => is_login.value);
    const getIdProgreso = computed(() => id_progreso.value);
    const getTieneMonitor = computed(() => tieneMonitor.value);

    const guardarUsuario = (usu) => {
      id_usuario.value = usu;
    };
    const guardarRutina = (rutina) => {
      id_rutina.value = rutina;
    };

    const guardarIsLogin = (valor) => {
      is_login.value = valor;
    };

    const guardarIdProgreso = (valor) => {
      id_progreso.value = valor;
    };
    const guardarTieneMonitor = (valor) => {
      tieneMonitor.value = valor;
    };

    return {
      getUsuario,
      getRutina,
      getIsLogin,
      getIdProgreso,
      getTieneMonitor,
      guardarUsuario,
      guardarRutina,
      guardarIsLogin,
      guardarIdProgreso,
      guardarTieneMonitor,
    };
  },
  {
    persist: true,
  }
);
