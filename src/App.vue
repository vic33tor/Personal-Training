<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import CabeceraPrincipal from "@/components/CabeceraPrincipal.vue";
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const isLog = ref(false);

let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLog.value = true;
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

    <RouterView />

    <div class="basis-1/5" v-if="isLog">
      <NavBar
        :links="['Inicio', 'Rutina', 'Ejercicios', 'Progreso', 'Servicios']"
      />
    </div>
  </div>
</template>

<style scoped>
.app {
  background-color: rgb(63, 63, 63);
}
</style>
