<template>
  <Swiper
    :autoplay="{
      delay: 3500,
    }"
    :slides-per-view="1"
    :space-between="25"
    :modules="[Navigation, Pagination, Autoplay]"
    navigation
    :pagination="{
      clickable: true,
      dynamicBullets: true,
    }"
  >
    <SwiperSlide>
      <img src="../assets/Images/recipes/SalmonHorno.jpg" alt="" />
    </SwiperSlide>

    <SwiperSlide>
      <img src="../assets/Images/recipes/BatidoVai.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="../assets/Images/recipes/SalteadoVerd.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="../assets/Images/recipes/Tomaten-Feta-Brote.jpg" alt="" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import { useRouter } from "vue-router";

const recetas = [
  { nombre: "SalmonHorno", src: "../assets/Images/recipes/SalmonHorno.jpg" },
  { nombre: "SalmonHorno", src: "../assets/Images/recipes/BatidoVai.jpg" },
  { nombre: "SalmonHorno", src: "../assets/Images/recipes/SalteadoVerd.jpg" },
  {
    nombre: "SalmonHorno",
    src: "../assets/Images/recipes/Tomaten-Feta-Brote.jpg",
  },
];

const router = useRouter();

const clickReceta = () => {
  router.push({
    name: "InfoReceta",
  });
};
</script>

<style scoped></style>
