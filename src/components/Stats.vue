<template>
  <div>
    <p>TODO: Stats</p>
    <div>
      <strong>BMI: </strong>
      {{ formatNumber(values.bmi, 1) }}
      <div v-if="!values.bmi"><small>Requires weight and height</small></div>
    </div>
    <div>
      <strong>RFM: </strong>
      {{ formatNumber(values.rfm, 2, "%") }}
      <div v-if="!values.rfm">
        <small>Requires gender, height and waist diameter</small>
      </div>
    </div>
    <div>
      <strong>Deurenberg: </strong>
      {{ formatNumber(values.deurenberg, 2, "%") }}
      <div v-if="!values.deurenberg">
        <small>Requires gender, age, weight and height.</small>
      </div>
    </div>
    <div>
      <strong>US Navy: </strong>
      {{ formatNumber(values.usNavy, 2, "%") }}
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Stats",

  props: {
    values: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },

  methods: {
    formatNumber: function(number, decimals, unity) {
      if (!_.isNumber(number)) {
        return "N/A";
      }

      let res = decimals ? +number.toFixed(decimals) : number;
      if (unity) {
        res += " " + unity;
      }
      return res;
    }
  }
};
</script>
