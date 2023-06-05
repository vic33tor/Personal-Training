<template>
  <header class="header">
    <div class="logo-header">
      <a href=""><img :src="props.imagen" alt="" /></a>
    </div>
    <div class="nav-menu">
      <div class="contenidoHead p-6 bg-neutral-600 flex">
        <div>
          <h1 class="text-left text-3xl text-yellow-300 font-bold">
            {{ props.titulo }}
          </h1>
        </div>
        <div>
          <button @click="handleSignOut" v-if="isLog" class="boton">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDatosStore } from "@/stores/DatosForm";
const datos = useDatosStore();

const router = useRouter();
const props = defineProps({
  titulo: String,
  imagen: String,
});
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

const handleSignOut = () => {
  datos.guardarRutina(undefined)
  datos.guardarIdProgreso(undefined)
  signOut(auth).then(() => {
    router.push({
      name: "Login",
    });
  });
};
</script>

<style scoped>
.contenidoHead {
  justify-content: space-between;
}

.boton {
  background-color: #d3e213;
  padding: 5px;
  border-radius: 6px;

  margin-bottom: 0.5em;
}

.boton:hover {
  background-color: #9ca520;
  transition: 0.5s;
}
</style>
