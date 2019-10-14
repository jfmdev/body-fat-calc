<template>
  <div id="app" class="container">
    <h1 class="text-center">Body Fat Calculator</h1>

    <div class="row">
      <div class="col-md-4">
        <Calculator />
      </div>
      <div class="col-md-8">
        <Stats />
      </div>
    </div>

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
