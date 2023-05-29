<template>
  <div class="contenedor">
    <form class="" @submit.prevent="">
      <h1 class="">Registro</h1>
      <div class="inputCont">
        <input
          class=""
          type="text"
          v-model="nombre"
          placeholder="Nombre"
          title="Nombre"
        />
      </div>
      <div class="inputCont">
        <input
          type="password"
          v-model="passwd"
          placeholder="Contraseña"
          title="Contraseña"
        />
      </div>
      <div class="inputCont">
        <input
          class=""
          type="text"
          v-model="email"
          placeholder="Email"
          title="Email"
        />
      </div>

      <div class="botonera">
        <button type="submit" class="check" @click="registro()">
          Terminar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { registraUsuario, onLogIn, onGetRutina } from "../API/firebase";
import { useDatosStore } from "@/stores/DatosForm";
const datos = useDatosStore();

let nombre = ref("");
let passwd = ref("");
let email = ref("");
const router = useRouter();

const registro = () => {
  registraUsuario("USUARIOS", {
    nombre: nombre.value,
    contrasena: passwd.value,
    email: email.value,
  });
  onLogIn("USUARIOS", nombre.value, (docs) => {
    docs.forEach((doc) => {
      datos.guardarUsuario(doc.id);
    });
  });
  if (!datos.getRutina) {
    onGetRutina("RUTINAS", datos.getUsuario, (docs) => {
      docs.forEach((doc) => {
        datos.guardarRutina(doc.id);
      });
    });
  }
  router.push({
    name: "Inicio",
    params: { name: nombre.value },
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
  height: 450px;
  border-radius: 5px;
  background: gray;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2em;
  border: 1px solid #dde933;
}

form {
  position: absolute;
  inset: 2px;
  border-radius: 8px;
  background: rgb(102, 102, 102);
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
}

.botonera {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
}

.check {
  background-color: #d3e213;
  padding: 5px;
  border-radius: 6px;
  width: 90px;
  margin-bottom: 0.5em;
}

.check:hover {
  background-color: #a9b320;
  transition: 0.5s;
}
.registro {
  padding: 5px;
  border-radius: 6px;
}

.registro:hover {
  background-color: rgb(98, 102, 102);
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
