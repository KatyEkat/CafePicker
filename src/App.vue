<template>
  <div class="container mt-4">
    <h1>Random Cafe Picker</h1>
    <button @click="getRandomCafe" class="btn btn-primary mt-2">
      Выбрать случайное кафе
    </button>
    <div v-if="selectedCafe">
      <h3>{{ selectedCafe.name }}</h3>
      <p>Кухня: {{ selectedCafe.cuisine }}</p>
      <p>Средний чек: {{ selectedCafe.price }} руб.</p>
      <button @click="shareCafe(selectedCafe)" class="btn btn-success">Поделиться</button>
    </div>
    <div v-else>
      <div v-for="cafe in cafes" :key="cafe.id">
        <h3>{{ cafe.name }}</h3>
        <p>Кухня: {{ cafe.cuisine }}</p>
        <p>Средний чек: {{ cafe.price }} руб.</p>
        <button @click="shareCafe(cafe)" class="btn btn-success">Поделиться</button>
        <hr>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import { getCafes } from '../api/api';

export default defineComponent({
  name: "App",
  setup() {
    let cafes = ref([]);
    let selectedCafe = ref(null);

    const getAllCafes = async () => {
      const response = await getCafes();
      cafes.value = response.data.data;
    };

    const getRandomCafe = () => {
      const randomIndex = Math.floor(Math.random() * cafes.value.length);
      selectedCafe.value = cafes.value[randomIndex];
    };

    const shareCafe = (cafe) => {
      alert("Поделись кафе '" + cafe.name + "' с друзьями!");
    };

    onMounted(getAllCafes);

    return {
      cafes,
      selectedCafe,
      getRandomCafe,
      shareCafe,
    };
  },
});
</script>
<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.btn-primary {
  margin-bottom: 10px;
}

h3 {
  margin-top: 10px;
}

.btn-success {
  margin-top: 10px;
}
</style>