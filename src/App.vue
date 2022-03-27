<template>
  <h1>Memory game</h1>
  <div>Steps: {{ steps }}</div>
  <div class="game-board">
    <Card
      v-for="(card, index) in cardList"
      :key="index"
      :isFlipped="card.isFlipped"
      :card-position="card.position"
      :value="card.value"
      :isMatched="card.isMatched"
      @flip="flipCard"
    />
  </div>
  <div>{{ gameStatus }}</div>
  <button @click="restartGame">restartGame</button>
</template>

<script setup>
import _ from "lodash";
import { ref, watch, computed } from "vue";
import Card from "./components/Card.vue";

const cardList = ref([]);
const flippedCards = ref([]);
const steps = ref(0);

const remainingPairs = computed(
  () => cardList.value.filter((card) => card.isMatched === false).length / 2
);
const gameStatus = computed(() =>
  remainingPairs.value === 0
    ? "You win"
    : `Remaining pairs: ${remainingPairs.value}`
);

const cardValues = [1, 2, 3, 4, 5, 6, 7, 8];

cardValues.forEach((value) => {
  cardList.value.push({
    position: null,
    isFlipped: false,
    value: value,
    isMatched: false,
  });
  cardList.value.push({
    position: null,
    isFlipped: false,
    value: value,
    isMatched: false,
  });
  cardList.value = cardList.value.map((card, index) => {
    return {
      ...card,
      position: index,
    };
  });
});

const shuffleCards = () => {
  cardList.value = _.shuffle(cardList.value);
};

const restartGame = () => {
  shuffleCards();

  cardList.value = cardList.value.map((card, index) => {
    return { ...card, isMatched: false, isFlipped: false, position: index };
  });
};

const flipCard = (card) => {
  cardList.value[card.cardPosition].isFlipped = true;

  if (flippedCards.value[0]) {
    if (
      flippedCards.value[0].cardPosition === card.cardPosition &&
      flippedCards.value[0].value === card.value
    ) {
      return;
    } else flippedCards.value[1] = card;
  } else flippedCards.value[0] = card;
};

const isMatch = (cardOne, cardTwo) => {
  if (cardOne.value === cardTwo.value) {
    cardList.value[cardOne.cardPosition].isMatched = true;
    cardList.value[cardTwo.cardPosition].isMatched = true;
  } else {
    setTimeout(() => {
      cardList.value[cardOne.cardPosition].isFlipped = false;
      cardList.value[cardTwo.cardPosition].isFlipped = false;
    }, 1000);
  }
  steps.value += 1;
};

watch(
  flippedCards,
  (current) => {
    if (current.length === 2) {
      const cardOne = current[0];
      const cardTwo = current[1];
      isMatch(cardOne, cardTwo);
      flippedCards.value.length = 0;
    }
  },
  { deep: true }
);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.card {
  border: 2px solid black;
}
.game-board {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: 100px 100px 100px 100px;
  row-gap: 30px;
  column-gap: 30px;
  justify-content: center;
}
</style>
