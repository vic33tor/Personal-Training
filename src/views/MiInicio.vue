<template>
  <div class="flex gap-2">
    <img
      class="w-6/12"
      src="../assets/images/3df7817728fa04eb106c782b2db0d71c-removebg-preview.png"
      alt=""
    />
    <div class="z-10 absolute w-5/6 right-0 top-28 text-center">
      <div class="bg-opacity-75 rounded-lg p-6">
        <h1 class="text-white text-3xl font-bold">
          ENTRENAMIENTOS A MEDIDA PARA ALCANZAR EL OBJETIVO QUE TÚ TE PROPONGAS
        </h1>
      </div>
    </div>
  </div>
  <div class="shortText">
    <h1 class="solo">Solo en</h1>
    <h1 class="name">Just Fit</h1>
  </div>
  <div class="propuestas">
    <div class="elementoPropuesta">
      <img src="../assets/Images/entrenamiento-personalizado.jpg" alt="" />
      <h1>Entrenamiento personalizado</h1>
      <h2>Crea tu rutina en muy pocos clicks</h2>
    </div>
    <div class="elementoPropuesta">
      <img src="../assets/Images/ClasesMedida.jpg" alt="" />
      <h1>Apúntate a clases a medida</h1>
      <h2>
        Las clases colectivas son una forma entretenida de completar tu
        entrenamiento. Corre a echar un vistazo!
      </h2>
    </div>
    <div class="elementoPropuesta">
      <img src="../assets/Images/monitGym.jpg" alt="" />
      <h1>Monitores que apoyan tu entrenamiento</h1>
      <h2>Facilitamos la asesoría de los mejores profesionales.</h2>
    </div>
    <div class="elementoPropuesta">
      <img src="../assets/Images/recetaFitCard.jpg" alt="" />
      <h1>Recetas fit para mejorar en el día a día</h1>
      <h2>
        Las recetas gastronómicas más eficaces para complementar el ejercicio
        diario
      </h2>
    </div>
  </div>
  <div class="shortText">
    <h1 class="solo">Nuestras</h1>
    <h1 class="name">recetas fit</h1>
  </div>
  <div class="carouselRecetas">
    <MiCarousel />
    <button
      class="bg-yellow-300 pl-2 pr-2 mt-2 rounded-sm hover:bg-yellow-500"
      @click="verRectas"
    >
      Ver más recetas
    </button>
  </div>
</template>

<script setup>
import MiCarousel from "../components/MiCarousel.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const verRectas = () => {
  router.push({
    name: "MisRecetas",
  });
};
</script>

<style scoped>
/*
.aperturaInicio {
  display: flex;
  gap: 50px;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}
.slogan {
  color: white;
  width: 400px;
  position: relative;
  left: 50px;
  font-size: 25px;
  padding-top: 1em;
  z-index: 10;
}

.imagenInicio {
  z-index: 9;
  position: relative;
  right: 5em;
  opacity: 50%;
}
*/
.shortText {
  display: flex;
  gap: 5px;
  font-size: 40px;
}

.solo {
  color: white;
}

.name {
  color: yellow;
}

.propuestas {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  gap: 20px;
  padding: 0 10px 0 10px;
}

.elementoPropuesta {
  border: solid 1px white;
  width: 25%;
  height: 350px;
  box-shadow: 0 4px 8px 0 rgba(162, 255, 0, 0.2);
  transition: 0.3s;
  color: white;
  border-radius: 10px;
}

.elementoPropuesta h1 {
  width: 100%;
  font-size: large;
}
.elementoPropuesta img {
  border-radius: 10px;
}

.elementoPropuesta:hover {
  box-shadow: 0 15px 16px 0 rgba(229, 255, 0, 0.2);
  transform: scale(1.02);
}


.carouselRecetas {
  width: 75%;
  margin: 0 auto;
  margin-bottom: 100px; /* Ajusta el margen inferior para evitar que se corte el contenido */
}
</style>
