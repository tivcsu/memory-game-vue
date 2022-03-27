<template>
  <div class="card" @click="flipCard()">
    <div
      v-if="isFlipped"
      class="card__side card--front"
      :class="{ matched: isMatched }"
    >
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
  position: relative;
}
.card__side {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}
img {
  position: relative;
  width: 60%;
}
.card--back {
  background-color: #ddbea9;
}
.matched {
  cursor: default;
  box-shadow: none;
}
</style>
