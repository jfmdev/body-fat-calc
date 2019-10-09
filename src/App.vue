<template>
  <div id="app" class="container">
    <h1 class="text-center">Body Fat Calculator</h1>
    <Calculator />
    <Stats />
    <History />
  </div>
</template>

<script>
import Calculator from "./components/Calculator.vue";
import History from "./components/History.vue";
import Stats from "./components/Stats.vue";

export default {
  name: "app",

  components: {
    Calculator,
    History,
    Stats
  }
};
</script>
