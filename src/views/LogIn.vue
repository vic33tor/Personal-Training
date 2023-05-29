<template>
  <div class="h-screen">
    <div class="contenedor">
      <form class="" @submit.prevent="">
        <h1 class="">INICIA SESIÓN</h1>
        <div class="inputCont">
          <input class="" type="text" v-model="nombre" placeholder="Nombre" />
        </div>
        <div class="inputCont">
          <input type="password" v-model="passwd" placeholder="Contraseña" />
        </div>
        <div class="botonera">
          <button type="submit" class="log" @click="logIn">Log In</button>
          <button class="registro" to="/Registro" @click="registro">
            ¿No tienes cuenta?
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { onLogIn, onGetRutina } from "../API/firebase";
import { useDatosStore } from "@/stores/DatosForm";

const datos = useDatosStore();

let nombre = ref("");
let passwd = ref("");
const router = useRouter();

const logIn = () => {
  onLogIn("USUARIOS", nombre.value, (docs) => {
    docs.forEach((doc) => {
      if (doc.data().contrasena == passwd.value) {
        console.log(doc.id);
        datos.guardarUsuario(doc.id);
        datos.guardarIsLogin(true);
        router.push({
          name: "Inicio",
          params: { name: doc.data().nombre },
        });
      } else {
        alert("Nombre o contraseña incorrectos");
      }
    });
  });
  if (!datos.getRutina) {
    onGetRutina("RUTINAS", datos.getUsuario, (docs) => {
      docs.forEach((doc) => {
        datos.guardarRutina(doc.id);
      });
    });
  }
};

const registro = () => {
  router.push({
    name: "SignUp",
  });
};
</script>

<style scoped>
* {
  margin: 0 auto;
}
.contenedor {
  position: relative;
  text-align: center;
  width: 380px;
  height: 380px;
  border-radius: 5px;
  background: gray;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2em;
}

.contenedor::before {
  content: "";
  position: absolute;
  left: -50%;
  top: -50%;
  width: 380px;
  height: 380px;
  background: linear-gradient(0deg, transparent, #d3e213, #dfe73c);
  transform-origin: bottom right;
  animation: animate 6s linear infinite;
  animation-delay: -3s;
}

.contenedor::after {
  content: "";
  position: absolute;
  left: -50%;
  top: -50%;
  width: 380px;
  height: 380px;
  background: linear-gradient(0deg, transparent, #d3e213, #dfe73c);
  transform-origin: bottom right;
  animation: animate 6s linear infinite;
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

form {
  position: absolute;
  inset: 2px;
  border-radius: 8px;
  background: rgb(103, 104, 101);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

form > h1 {
  color: #dde933;
  padding-top: 20px;
  letter-spacing: 5px;
  margin-top: 0.75em;
  font-size: xx-large;
}

.inputCont {
  position: relative;
  margin-top: 30px;
  margin-bottom: 1em;
}

input {
  background: transparent;
  border-bottom: 1px solid rgb(207, 207, 10);
  color: white;
  content: center;
}

.botonera {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
}

.log {
  background-color: #d3e213;
  padding: 5px;
  border-radius: 6px;
  width: 60px;
  margin-bottom: 0.5em;
}

.log:hover {
  background-color: #9ca520;
  transition: 0.5s;
}
.registro {
  padding: 5px;
  border-radius: 6px;
  color: rgb(255, 255, 255);
}

.registro:hover {
  background-color: rgb(156, 161, 161);
  transition: 0.5s;
}
/*
.inputCont input {
  position: relative;
  width: 100%;
  padding: 20px 10px 10px;
  background: transparent;
  border: none;
  outline: none;
  color: white;
}

.inputCont h3 {
  position: absolute;
  left: 0;
  padding: 20px 10px 10px;
  width: 100%;
  pointer-events: none;
  background: transparent;
  color: white;
  letter-spacing: 0.5em;
  transition: 0.5s;
}

.inputCont input:valid ~ h3,
.inputCont input:focus ~ h3 {
  color: white;
  transform: translateX(0px) translateY(-34px);
  font-size: 0.75em;
}

/*
.inputCont i {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #dbe915;
  transition: 0.5s;
  pointer-events: none;
  z-index: 9;
}

.inputCont input:valid ~ i,
.inputCont input:focus ~ i {
  height: 44px;
}
*/
</style>
