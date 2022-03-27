<template>
  <h1>Memory game</h1>
  <div class="game-board">
    <Card v-for="card in cardList" :key="card" />
  </div>
</template>

<script setup>
import Card from "./components/Card.vue";

const cardList = [];

for (let i = 0; i < 9; i++) {
  cardList.push(i);
}
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
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  row-gap: 30px;
  column-gap: 30px;
  justify-content: center;
}
</style>
