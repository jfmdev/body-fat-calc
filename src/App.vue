<template>
  <div id="app" class="container">
    <h1 class="text-center">Body Fat Calculator</h1>

    <div class="row">
      <div class="col-md-4">
        <Calculator v-model="details" />
      </div>
      <div class="col-md-8">
        <Stats />
      </div>
    </div>

    <History />
  </div>
</template>

<script>
import _ from "lodash";

import Calculator from "./components/Calculator.vue";
import History from "./components/History.vue";
import Stats from "./components/Stats.vue";

// TODO: Remove this, and instead load the last values entered.
const DEFAULT_DETAILS = {
  system: "M",
  gender: "M",
  age: 33,
  height: 180,
  weight: 67,
  waist: 68,
  hip: 90,
  neck: 35
};

// TODO: listen for Calculator events, and pass them to History and Stats.
export default {
  name: "app",

  components: {
    Calculator,
    History,
    Stats
  },

  data: function() {
    return {
      details: _.clone(DEFAULT_DETAILS)
    };
  }
};
</script>
