<template>
  <div id="app" class="container">
    <h1 class="text-center mb-2">Body Fat Calculator</h1>

    <div class="row">
      <div class="col-md-4">
        <DetailsInputs v-model="details" @input="calculateStats" />
      </div>
      <div class="col-md-8">
        <Stats :values="results" :is-female="isFemale" />
      </div>
    </div>

    <History />
  </div>
</template>

<script>
import _ from "lodash";

import DetailsInputs from "@/components/DetailsInputs";
import History from "@/components/History";
import Stats from "@/components/Stats";
import Formulas from "@/utils/formulas";
import { IN_TO_CM, LBS_TO_KG } from "@/utils/constants";

// TODO: remove this (initialize the inputs empties).
const DEFAULT_DETAILS = {
  system: "M",
  gender: "M",
  age: 33,
  height: 180,
  weight: 67,
  waist: 75,
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

  computed: {
    isFemale: function() {
      return this.details.gender === "F";
    }
  },

  methods: {
    calculateStats: function(details) {
      // Convert values to metric system, if need.
      if (details.system !== "M") {
        details = _.clone(details);
        details.height *= IN_TO_CM;
        details.waist *= IN_TO_CM;
        details.neck *= IN_TO_CM;
        details.hip *= IN_TO_CM;
        details.weight *= LBS_TO_KG;
      }

      // Calculate stats.
      this.results = {
        bmi: Formulas.BMI(details.height, details.weight),
        deurenberg: Formulas.deurenberg(
          details.gender === "F",
          details.height,
          details.weight,
          details.age
        ),
        rfm: Formulas.RFM(
          details.gender === "F",
          details.height,
          details.waist
        ),
        usNavy: Formulas.usNavy(
          details.gender === "F",
          details.height,
          details.waist,
          details.neck,
          details.hip
        )
      };

      // TODO: Add values to local storage.
      // localStorage.push({ details, result });
    }
  }
};
</script>
