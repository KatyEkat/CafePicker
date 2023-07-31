<template>
  <div class="container mt-4">
    <h1>Random Cafe Picker</h1>
    <button @click="getRandomCafe" class="btn btn-primary mt-2">
      Выбрать случайное кафе
    </button>
    <div v-if="selectedCafe">
      <h3>{{ selectedCafe.name }}</h3>
      <p>Кухня: {{ selectedCafe.cuisine }}</p>
      <p>Средний чек: {{ selectedCafe.average_bill }} руб.</p>
      <button @click="shareCafe" class="btn btn-success">Поделиться</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";

export default defineComponent({
  name: "App",
  setup() {
    let cafes = ref([]);
    let selectedCafe = ref(null);

    const getCafes = async () => {
      try {
        const { data } = await axios.get(
          "https://bandaumnikov.ru/api/test/site/get-index"
        );
        if (!data) {
          return console.error("Пустой ответ от сервера");
        }
        cafes.value = data.data;
      } catch (error) {
        console.error(error);
      }
    };

    const getRandomCafe = async () => {
      if (cafes.value.length === 0) {
        await getCafes();
      }
      const randomIndex = Math.floor(Math.random() * cafes.value.length);
      selectedCafe.value = cafes.value[randomIndex];
    };

    const shareCafe = () => {
      alert("Поделись кафе с друзьями!");
    };

    onMounted(() => getCafes());

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
