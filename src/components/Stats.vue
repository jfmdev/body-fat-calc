<template>
  <div>
    <p>TODO: Stats</p>
    <div>
      <strong>BMI: </strong>
      {{ formatNumber(values.bmi, 1) }}
      <transition name="shrink-font">
        <div v-if="!values.bmi" class="text-small">
          Requires weight and height
        </div>
      </transition>
    </div>

    <div>
      <strong>RFM: </strong>
      {{ formatNumber(values.rfm, 2, "%") }}
      <transition name="shrink-font">
        <div v-if="!values.rfm" class="text-small">
          Requires gender, height and waist diameter
        </div>
      </transition>
    </div>

    <div>
      <strong>Deurenberg: </strong>
      {{ formatNumber(values.deurenberg, 2, "%") }}
      <transition name="shrink-font">
        <div v-if="!values.deurenberg" class="text-small">
          Requires gender, age, weight and height.
        </div>
      </transition>
    </div>

    <div>
      <strong>US Navy: </strong>
      {{ formatNumber(values.usNavy, 2, "%") }}
      <transition name="shrink-font">
        <div v-if="!values.usNavy" class="text-small">
          Requires gender, height, waist diameter<span v-if="isFemale"
            >, hip diameter</span
          >
          and neck diameter.
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Stats",

  props: {
    isFemale: {
      type: Boolean,
      default: false
    },
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
