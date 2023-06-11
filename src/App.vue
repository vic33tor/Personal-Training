<script setup>
import { RouterView, useRouter } from "vue-router";
import NavBar from "./components/NavBar.vue";
import CabeceraPrincipal from "@/components/CabeceraPrincipal.vue";
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const isLog = ref(false);
const router = useRouter();

let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLog.value = true;
      router.push({
        name: "Inicio",
      });
      //creo que si guardamos nuevamente la id del usuario en pinia por aqui
      // puede que solucionemos el problema de perder los datos al recargar la pagina
    } else {
      isLog.value = false;
    }
  });
});
</script>

<template>
  <div class="app">
    <div v-if="isLog">
      <CabeceraPrincipal titulo="Just Fit" />
    </div>
    <div class="overflow-scroll overflow-y-hidden overflow-x-hidden">
      <RouterView class="mb-36" />
    </div>

    <div class="basis-1/5" v-if="isLog">
      <NavBar
        :links="['Inicio', 'Rutina', 'Ejercicios', 'Progreso', 'Servicios']"
        class=""
      />
    </div>
  </div>
</template>

<style scoped>
.app {
  background-color: rgb(63, 63, 63);
}
</style>
