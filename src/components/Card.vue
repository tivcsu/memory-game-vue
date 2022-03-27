<template>
  <div class="card" @click="flipCard()">
    <div v-if="isFlipped" class="card__side card--front">
      <img :src="`/images/${value}.png`" :alt="value" />
    </div>
    <div v-else class="card__side card--back"></div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  cardPosition: Number,
  isFlipped: Boolean,
  value: String,
  isMatched: Boolean,
});

const emit = defineEmits(["flip"]);

const flipCard = () => {
  emit("flip", props);
};
</script>

<style>
.card {
  border: 2px solid black;
  position: relative;
  cursor: pointer;
}
.card__side {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
img {
  position: relative;
  width: 60%;
}
.card--back {
  background-color: blue;
}
</style>
