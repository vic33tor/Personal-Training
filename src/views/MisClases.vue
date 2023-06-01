<template>
  <div class="text-center text-white text-2xl mt-2">
    <div class="contenedor text-center mt-2">
      <div class="textoInicio flex gap-3">
        <h1 class="name text-white text-3xl pt-2 mb-2">Clases</h1>
        <h1 class="text-white text-3xl pt-2 mb-2">grupales</h1>
      </div>
    </div>

    <select v-model="opciones" class="mt-2 text-black rounded-md">
      <option value="">Todas</option>
      <option value="contacto">Deportes de contacto</option>
      <option value="baile">Baile</option>
      <option value="yoga">Yoga</option>
      <!-- Agrega las opciones que necesites -->
    </select>
    <ul class="estilosLista">
      <li
        v-for="item in clasesFiltro"
        :key="item.id"
        class=""
        @click="verClase(item.id)"
      >
        <div class="imagen opacity-75 hover:opacity-50">
          <img
            :src="item.img"
            alt="Imagen del monitor"
            class="item z-10 rounded-lg"
          />
        </div>
        <div class="contenedorNombre z-11 relative bottom-2/4">
          <h1 class="text-3xl text-white font-bold">{{ item.nombre }}</h1>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onGetClases } from "../API/firebase";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";

const misClases = ref([]);
const opciones = ref("");
const router = useRouter();

onMounted(() => {
  dameClases();
});

const verClase = (id) => {
  router.push({
    name: "InfoClase",
    query: { id },
  });
};

const dameClases = () => {
  misClases.value = [];
  onGetClases("CLASES", (docs) => {
    docs.forEach((doc) => {
      misClases.value.push({ id: doc.id, ...doc.data() });
    });
  });
};

const clasesFiltro = computed(() => {
  if (!opciones.value) {
    return misClases.value;
  } else {
    return misClases.value.filter((x) => {
      return x.tipo === opciones.value;
    });
  }
});
</script>

<style scoped>
.contenedorNombre {
  margin: 0 auto;
}
.estilosLista {
  place-content: center;
  display: grid;
  grid-template-columns: 50% 50%;
  width: 50%;
  margin: 0 auto;
  gap: 10px;
}

.textoInicio {
  place-content: center;
}

.name {
  color: yellow;
}

.item {
  height: 200px;
}

.imagen {
  transition: 0.3s;
}

.imagen:hover {
  box-shadow: 0 15px 16px 0 rgba(229, 255, 0, 0.2);
  transform: scale(1.02);
}
@media screen and (max-width: 925px) {
  .estilosLista {
    display: flex;
    flex-direction: column;
  }
  .item {
    width: 2/4;
  }
}
</style>
