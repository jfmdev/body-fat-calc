<template>
  <div id="app" class="container">
    <h1 class="text-center">Body Fat Calculator</h1>

    <div class="row">
      <div class="col-md-4">
        <DetailsInputs v-model="details" @input="calculateStats" />
      </div>
      <div class="col-md-8">
        <Stats :values="results" />
      </div>
    </div>

    <History />
  </div>
</template>

<script>
import _ from "lodash";

import DetailsInputs from "./components/DetailsInputs";
import History from "./components/History";
import Stats from "./components/Stats";
import Formulas from "./utils/formulas";

// TODO: remove this (initialize the inputs empties).
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

// TODO: Add button to allow users to save results into the history.
export default {
  name: "app",

  components: {
    DetailsInputs,
    History,
    Stats
  },

  data: function() {
    // TODO: If available, load history and initialize details and result with the lastest values.
    return {
      details: _.clone(DEFAULT_DETAILS),
      results: {},
      history: []
    };
  },

  methods: {
    calculateStats: function(details) {
      // Calculate stats.
      this.results = {
        bmi: Formulas.bmi(details.weight, details.height),
        deurenberg: Formulas.deurenberg(),
        rfm: Formulas.rfm(
          details.gender === "F",
          details.height,
          details.waist
        ),
        usNavy: Formulas.usNavy()
      };

      // TODO: Add values to local storage.
      // localStorage.push({ details, result });
    }
  }
};
</script>
