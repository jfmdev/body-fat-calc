import _ from "lodash";
import Vue from "vue";
import Vuex from "vuex";

import { IN_TO_CM, LBS_TO_KG } from "@/utils/constants";
import Formulas from "@/utils/formulas";

Vue.use(Vuex);

function metricInput(input) {
  if (input && input.system !== "M") {
    input = _.clone(input);
    input.height *= IN_TO_CM;
    input.waist *= IN_TO_CM;
    input.neck *= IN_TO_CM;
    input.hip *= IN_TO_CM;
    input.weight *= LBS_TO_KG;
  }
  return input;
}

const store = new Vuex.Store({
  state: {
    input: {
      system: "M",
      gender: "F",
      age: null,
      height: null,
      weight: null,
      waist: null,
      hip: null,
      neck: null
    }
  },

  mutations: {
    input(state, newInput) {
      // Use 'assign' in case 'newInput' doesn't has all fields.
      state.input = _.assign({}, state.input, newInput);
    }
  },

  getters: {
    isFemale: state => state.input && state.input.gender === "F",
    isMetric: state => state.input && state.input.system === "M",
    lengthUnit: state =>
      state.input && state.input.system === "M" ? "cm" : "in",
    weightUnit: state =>
      state.input && state.input.system === "M" ? "kg" : "lbs",

    bmi: state => {
      if (state.input) {
        const input = metricInput(state.input);
        return Formulas.BMI(input.height, input.weight);
      }
      return null;
    },
    deurenberg: state => {
      if (state.input) {
        const input = metricInput(state.input);
        return Formulas.deurenberg(
          input.gender === "F",
          input.height,
          input.weight,
          input.age
        );
      }
      return null;
    },
    rfm: state => {
      if (state.input) {
        const input = metricInput(state.input);
        return Formulas.RFM(input.gender === "F", input.height, input.waist);
      }
      return null;
    },
    usNavy: state => {
      if (state.input) {
        const input = metricInput(state.input);
        return Formulas.usNavy(
          input.gender === "F",
          input.height,
          input.waist,
          input.neck,
          input.hip
        );
      }
      return null;
    }
  }
});

export default store;