<template>
  <div class="container">
    <div class="bg-stone-200 rounded-lg p-4">
      <div class="flex flex-col items-center">
        <div class="h-56 overflow-hidden mb-2 rounded-t-lg">
          <img
            src="../assets/Images/fitness-1440x900.jpg"
            alt="Imagen de clases"
            class="object-cover w-full h-full"
          />
        </div>
        <h1 class="text-xl font-bold mb-2 text-gray-700 whitespace-nowrap">
          Clases grupales de fitness
        </h1>
        <p class="text-sm text-gray-700 mb-4">
          Descubre nuestras clases grupales de fitness y alcanza tus metas.
        </p>
        <button class="bg-yellow-300 rounded-sm px-4 py-2 hover:bg-yellow-500">
          Ver más clases
        </button>
      </div>
    </div>
    <div class="bg-stone-200 rounded-lg p-4">
      <div class="flex flex-col items-center">
        <div class="h-56 overflow-hidden mb-2 rounded-t-lg">
          <img
            src="../assets/Images/monitorGym2.jpg"
            alt="Imagen de monitores"
            class="object-cover w-full h-full"
          />
        </div>
        <h1 class="text-xl font-bold mb-2 text-gray-700 whitespace-nowrap">
          Contratación de monitores deportivos
        </h1>
        <p class="text-sm text-gray-700 mb-4">
          Contrata a nuestros monitores para ayudarte en tu entrenamiento.
        </p>
        <button class="bg-yellow-300 rounded-sm px-4 py-2 hover:bg-yellow-500">
          Contrata tu monitor
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  width: 100%;
  text-align: center;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
  display: flex;
  gap: 8px;
}
@media screen and (max-width: 778px) {
  .container {
    display: flex;
    flex-direction: column;
  }
}
</style>
