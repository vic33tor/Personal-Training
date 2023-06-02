<template>
  <div class="contenedorPrincipal">
    <Transition>
      <div class="contenedor" v-if="mostrarRegistro === false">
        <form class="" @submit.prevent="">
          <h1 class="">INICIA SESIÓN</h1>
          <div class="inputCont">
            <input class="" type="text" v-model="email" placeholder="Email" />
          </div>
          <div class="inputCont">
            <input type="password" v-model="passwd" placeholder="Contraseña" />
          </div>
          <div class="botonera">
            <button type="submit" class="log" @click="logIn">Log In</button>
            <button
              class="bg-slate-200 p-0.5 rounded-md"
              @click="LogInWithGoogle"
            >
              Log in con Google
            </button>
            <button class="registro" @click="mostrarRegistro = true">
              ¿No tienes cuenta?
            </button>
          </div>
        </form>
      </div>
    </Transition>
    <Transition>
      <div class="contenedorRegistro" v-if="mostrarRegistro">
        <form class="" @submit.prevent="">
          <h1 class="">Registro</h1>
          <div class="inputCont">
            <input
              class=""
              type="text"
              v-model="email"
              placeholder="Email"
              title="Email"
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
          <div class="botonera">
            <button type="submit" class="log" @click="registro()">
              Terminar
            </button>
          </div>
          <div class="botonera">
            <button
              type="submit"
              @click="signInWithGoogle"
              class="bg-slate-200 p-0.5 rounded-md"
            >
              Regístrate con Google
            </button>
          </div>
          <div class="botonera">
            <button
              type="submit"
              @click="mostrarRegistro = false"
              class="registro"
            >
              Iniciar sesión con mi cuenta
            </button>
          </div>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { onLogIn, onGetRutina, registraUsuario } from "../API/firebase";
import { useDatosStore } from "@/stores/DatosForm";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const datos = useDatosStore();

let email = ref("");
let passwd = ref("");
const router = useRouter();

const mostrarRegistro = ref(false);

const logIn = () => {
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email.value, passwd.value)
    .then((data) => {
      alert("signIn");
      console.log("signIn");
      console.log(auth.currentUser);
      onLogIn("USUARIOS", email.value, (docs) => {
        docs.forEach((doc) => {
          console.log(doc.id);
          datos.guardarUsuario(doc.id);
          datos.guardarIsLogin(true);
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
      });
    })

    .catch((error) => {
      alert(error);
    });
};

const LogInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider).then((result) => {
    console.log(result.user.reloadUserInfo.email);
    onLogIn("USUARIOS", result.user.reloadUserInfo.email, (docs) => {
      docs.forEach((doc) => {
        datos.guardarUsuario(doc.id);
      });
      router.push({
        name: "Inicio",
      });
    });
  });
};

const registro = () => {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email.value, passwd.value)
    .then((data) => {
      alert("Registrado");
      console.log("Registrado");

      console.log(auth.currentUser);
      registraUsuario("USUARIOS", {
        email: email.value,
      });
      onLogIn("USUARIOS", email.value, (docs) => {
        docs.forEach((doc) => {
          datos.guardarUsuario(doc.id);
        });
      });
      router.push({
        name: "Inicio",
        params: { email: email.value },
      });
    })
    .catch((error) => {
      alert("Error");
      console.log(error);
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider).then((result) => {
    console.log(result.user.reloadUserInfo.email);
    registraUsuario("USUARIOS", {
      email: result.user.reloadUserInfo.email,
    });
    onLogIn("USUARIOS", result.user.reloadUserInfo.email, (docs) => {
      docs.forEach((doc) => {
        console.log(doc.id);
        datos.guardarUsuario(doc.id);
      });
      router.push({
        name: "Inicio",
      });
    });
  });
};
</script>

<style scoped>
.contenedorPrincipal {
  background-image: url("../assets/JustFitLogo.png");
  height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  grid-template-columns: 100%;
}

* {
  margin: 0 auto;
}
.contenedor {
  left: 15%;
  top: 25%;
  position: absolute;
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
.contenedorRegistro {
  right: 15%;
  top: 25%;
  position: absolute;
  text-align: center;
  width: 380px;
  height: 380px;
  border-radius: 5px;
  background: gray;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2em;
  opacity: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
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
