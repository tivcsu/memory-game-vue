<template>
  <div class="card" @click="flip()">
    <div v-if="isFlipped" class="card__side card--front">Card</div>
    <div v-else class="card__side card--back"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isFlipped = ref(false);

const flip = () => {
  isFlipped.value = !isFlipped.value;
};
</script>

<style scoped>
.card {
  border: 2px solid black;
  position: relative;
  cursor: pointer;
}
.card__side {
  width: 100%;
  height: 100%;
}
.card--back {
  background-color: blue;
}
</style>
