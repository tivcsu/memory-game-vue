<template>
  <div class="card" @click="flipCard()">
    <div v-if="isFlipped" class="card__side card--front">
      {{ value }} - {{ cardPosition }}
    </div>
    <div v-else class="card__side card--back"></div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  cardPosition: Number,
  isFlipped: Boolean,
  value: Number,
  isMatched: Boolean,
});

const emit = defineEmits(["flip"]);

const flipCard = () => {
  emit("flip", props);
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
