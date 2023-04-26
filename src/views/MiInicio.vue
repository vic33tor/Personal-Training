<template>
  <div class="aperturaInicio">
    <div class="slogan">
      <h1>
        ENTRENAMIENTOS A MEDIDA PARA ALCANZAR EL OBJETIVO QUE TÚ TE PROPONGAS
      </h1>
    </div>
    <div>
      <img
        src="../assets/images/3df7817728fa04eb106c782b2db0d71c-removebg-preview.png"
        alt=""
      />
    </div>
  </div>
  <div class="shortText">
    <h1 class="solo">Solo en</h1>
    <h1 class="name">Just Fit</h1>
  </div>
  <div class="propuestas">
    <div class="elementoPropuesta">
      <h2>Entrenamiento personalizado</h2>
    </div>
    <div class="elementoPropuesta">
      <h2>Apúntate a clases a medida</h2>
    </div>
    <div class="elementoPropuesta">
      <h2>Monitores que apoyan tu entrenamiento</h2>
    </div>
    <div class="elementoPropuesta">
      <h2>Receta fit para mejorar en el día a día</h2>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.slogan {
  color: white;
  width: 300px;
  height: auto;
  position: relative;
  left: 50px;
  font-size: 25px;
}

.aperturaInicio {
  display: flex;
  gap: 50px;
  flex-direction: row;
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
  flex-direction: row;
  width: 100%;
  justify-content: center;
  gap: 20px;
}

.elementoPropuesta {
  border: solid 1px white;
  width: 130px;
}
</style>
