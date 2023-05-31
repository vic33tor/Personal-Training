<template>
  <div class="container">
    <header class="header flex">
      <img
        class="w-10/12 mt-5 opacity-90"
        src="../assets/Images/portadaJustFit.png"
        alt=""
      />
      <div class="text-center absolute ">
        <h1
          class="text-white text-xl font-bold rounded-lg bg-stone-500 p-3 bg-opacity-70"
        >
          ENTRENAMIENTOS A MEDIDA PARA ALCANZAR EL OBJETIVO QUE TÚ TE PROPONGAS
        </h1>
      </div>
    </header>
    <div class="shortText mt-2">
      <h1 class="solo">Solo en</h1>
      <h1 class="name">Just Fit</h1>
    </div>

    <div class="propuestas">
      <div class="elementoPropuesta">
        <div class="imagenPropuesta">
          <img
            src="../assets/Images/entrenamiento-personalizado.jpg"
            alt=""
            class=""
          />
        </div>
        <div class="textoPropuesta">
          <h1 class="">Rutinas personales</h1>
        </div>
      </div>

      <div class="elementoPropuesta">
        <div class="imagenPropuesta">
          <img src="../assets/Images/ClasesMedida.jpg" alt="" />
        </div>
        <div class="textoPropuesta">
          <h1 class="">Clases a medida</h1>
        </div>
      </div>
      <div class="elementoPropuesta">
        <div class="imagenPropuesta">
          <img src="../assets/Images/monitGym.jpg" alt="" />
        </div>
        <div class="textoPropuesta">
          <h1 class="">Monitores</h1>
        </div>
      </div>
      <div class="elementoPropuesta">
        <div class="imagenPropuesta">
          <img src="../assets/Images/recetaFitCard.jpg" alt="" />
        </div>
        <div class="textoPropuesta">
          <h1 class="">Recetas fit</h1>
        </div>
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
.container {
  margin: 0 auto;
}

.header {
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
}

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
  align-items: center;
  align-content: center;
  gap: 20px;
  padding: 10px;
}

.elementoPropuesta {
  width: 25%;
  transition: 0.3s;
  color: white;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  text-align: center;
  justify-content: center;
}

.elementoPropuesta:hover {
  transform: scale(1.01);
}

.textoPropuesta {
  z-index: 9;
  position: absolute;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  color: white;
  font-size: xx-large;
}

.imagenPropuesta {
  border-radius: 10px;
  z-index: 10;
  box-shadow: 2px 8px 16px 2px rgba(251, 255, 0, 0.2);
}

.imagenPropuesta:hover {
  box-shadow: 0 15px 16px 0 rgba(229, 255, 0, 0.2);
  transition: 1s;
  opacity: 30%;
}

.carouselRecetas {
  width: 80%;
  margin: 0 auto;
  padding-bottom: 100px;
}

@media screen and (max-width: 1280px) {
  .propuestas {
    display: grid;
    grid-template-columns: 49% 49%;
  }
  .propuestas > div {
    width: 100%;
  }
}
@media screen and (min-width: 1280px) {
  .textoPropuesta {
    font-size: x-large;
  }
}
@media screen and (max-width: 480px) {
  .propuestas {
    display: grid;
    grid-template-columns: 90%;
  }
  .propuestas > div {
    width: 100%;
  }
}
</style>
