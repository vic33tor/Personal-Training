import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useDatosStore = defineStore("datos", () => {
  const nom_usuario = ref("");
  const pass_usuario = ref("");

  const getUsuario = computed(() => nom_usuario.value);
  const getPass = computed(() => pass_usuario.value);


  const guardarUsuario = (usu, pass) => {
    nom_usuario.value = usu;
    pass_usuario.value = pass
  };


  return {
    getUsuario,
    getPass,
    guardarUsuario
  };
});
