import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useDatosStore = defineStore("datos", () => {
  const id_usuario = ref("");
  const id_rutina = ref("");

  const getUsuario = computed(() => id_usuario.value);
  const getRutina = computed(() => id_rutina.value);


  const guardarUsuario = (usu) => {
    id_usuario.value = usu;
  };
  const guardarRutina = (rutina) => {
    id_rutina.value = rutina;
  };


  return {
    getUsuario,
    getRutina,
    guardarUsuario,
    guardarRutina
  };
});
