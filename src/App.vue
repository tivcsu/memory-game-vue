<template>
  <div class="header">
    <div class="deck-size">
      <div class="deck-size__text">Select deck size:</div>
      <input
        class="deck-size__value"
        type="number"
        max="20"
        min="6"
        step="2"
        v-model="deckSize"
      />
      <button @click="newGame">Start new game</button>
      <button v-if="canContinue && !gameStarted" @click="continueGame">
        Continue previous game
      </button>
    </div>
  </div>
  <h1 v-if="!gameStarted">Memory game</h1>
  <LandingPage v-if="!gameStarted" />
  <div class="game-page" v-else>
    <div class="status-row">
      <div class="steps">Steps: {{ steps }}</div>
      <button @click="restartGame">Restart Game</button>
    </div>

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
  </div>
</template>

<script setup>
import _ from "lodash";
import { ref, watch, computed } from "vue";
import Card from "./components/Card.vue";
import LandingPage from "./components/LandingPage.vue";

const cardList = ref([]);
const flippedCards = ref([]);
const steps = ref(0);
const deckSize = ref(12);
const gameStarted = ref(false);

const remainingPairs = computed(
  () => cardList.value.filter((card) => card.isMatched === false).length / 2
);
const gameStatus = computed(() =>
  remainingPairs.value === 0
    ? "You win"
    : `Remaining pairs: ${remainingPairs.value}`
);

const canContinue = computed(() => !!localStorage.getItem("cardList"));

const cardValues = [
  "angular",
  "d3",
  "jenkins",
  "postcss",
  "react",
  "redux",
  "sass",
  "splendex",
  "ts",
  "webpack",
];

const setBoard = () => {
  for (let i = 0; i < deckSize.value / 2; i++) {
    cardList.value.push({
      position: null,
      isFlipped: false,
      value: cardValues[i],
      isMatched: false,
    });
    cardList.value.push({
      position: null,
      isFlipped: false,
      value: cardValues[i],
      isMatched: false,
    });
    cardList.value = cardList.value.map((card, index) => {
      return {
        ...card,
        position: index,
      };
    });
  }
};
setBoard();

const shuffleCards = () => {
  cardList.value = _.shuffle(cardList.value);
};

const getLocalStorage = () => {
  cardList.value = JSON.parse(localStorage.getItem("cardList"));
  steps.value = JSON.parse(localStorage.getItem("steps"));
};

const restartGame = () => {
  shuffleCards();
  steps.value = 0;
  cardList.value = cardList.value.map((card, index) => {
    return { ...card, isMatched: false, isFlipped: false, position: index };
  });
};

const newGame = () => {
  localStorage.removeItem("cardList");
  gameStarted.value = true;
  cardList.value.length = 0;
  steps.value = 0;
  setBoard();
  shuffleCards();
  cardList.value = cardList.value.map((card, index) => {
    return { ...card, isMatched: false, isFlipped: false, position: index };
  });
};

const continueGame = () => {
  getLocalStorage();
  gameStarted.value = true;
};

const flipCard = (card) => {
  if (flippedCards.value.length === 2) return;
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
    localStorage.setItem("cardList", JSON.stringify(cardList.value));
  } else {
    setTimeout(() => {
      cardList.value[cardOne.cardPosition].isFlipped = false;
      cardList.value[cardTwo.cardPosition].isFlipped = false;
    }, 1000);
  }
  console.log(canContinue.value);
  steps.value += 1;
  localStorage.setItem("steps", JSON.stringify(steps.value));
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
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
}

.header {
  background-color: #264653;
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.45);
}

.status-row {
  display: flex;
  justify-content: space-between;
  max-width: 490px;
  margin: 0 auto 15px;
}

.deck-size {
  display: flex;
  max-width: 490px;
  margin: 0 auto;
  justify-content: center;
}

.deck-size__text {
  color: white;
  font-size: 20px;
  font-weight: 600;
}

.deck-size__value {
  margin-right: 10px;
  margin-left: 10px;
}

.game-board {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  row-gap: 30px;
  column-gap: 30px;
  justify-content: center;
  margin-bottom: 20px;
}
.steps {
  font-weight: 600;
  font-size: 16px;
}
.card {
  width: 100px;
  height: 100px;
}
@media only screen and (max-width: 600px) {
  .game-board {
    grid-template-columns: 100px 100px 100px;
  }
  .card {
    width: 100px;
    height: 100px;
  }
}
@media only screen and (max-width: 420px) {
  .game-board {
    grid-template-columns: 60px 60px;
  }
  .card {
    width: 60px;
    height: 60px;
  }
}
@media only screen and (max-width: 270px) {
  .game-board {
    grid-template-columns: 60px 60px;
  }
}
</style>
