<template>
  <div class="card text-medium">
    <div class="card-header p-2 text-center">
      Your results
    </div>
    <div class="card-body p-2">
      <!-- BMI (start) -->
      <div>
        <div>
          <strong>Body Mass Index:</strong>
          <span v-swap-fade="isNumber(bmi)">
            {{ formatNumber(bmi, 1, null) }}
          </span>
          <span v-swap-fade="!isNumber(bmi)">
            N/A <span class="text-danger">(requires weight and height)</span>
          </span>
        </div>

        <BMIRange class="mt-2" :value="bmi" />
      </div>
      <!-- BMI (end) -->

      <!-- BFP (start) -->
      <div class="mt-3">
        <!-- BFP Title -->
        <div class="row">
          <div class="col">
            <strong>Body Fat Percentage:</strong>
          </div>
          <div class="col" v-for="bfpMethod in BFPs" :key="bfpMethod.index">
            <div class="form-check">
              <input
                class="form-check-input clickable"
                type="radio"
                :value="bfpMethod.index"
                v-model="bfpIndex"
              />
              <label
                @click="bfpIndex = bfpMethod.index"
                class="form-check-label clickable"
              >
                <span :class="{ 'text-muted': bfpMethod.index !== bfpIndex }">
                  <span v-if="isNumber(bfpMethod.value)">
                    {{ formatNumber(bfpMethod.value, 2, "%") }}
                  </span>
                  <small v-else>
                    N/A<span
                      class="text-danger"
                      v-if="bfpMethod.index === bfpIndex"
                      >*</span
                    >
                  </small>
                </span>
                <span class="text-muted">({{ bfpMethod.label }})</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Error messages for missing fields -->
        <transition name="shrink-font">
          <div v-if="!isNumber(selectedBfp.value)" class="text-danger">
            * {{ selectedBfp.requiredMsg }}
          </div>
        </transition>

        <AmericanCouncil class="mt-2" :value="selectedBfp.value" />

        <JacksonPollard class="mt-2" :value="selectedBfp.value" />
      </div>
      <!-- BFP (end) -->
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";

import AmericanCouncil from "@/components/reports/AmericanCouncil";
import BMIRange from "@/components/reports/BMIRange";
import JacksonPollard from "@/components/reports/JacksonPollard";

export default {
  name: "Stats",

  components: {
    AmericanCouncil,
    BMIRange,
    JacksonPollard
  },

  data: function() {
    return {
      bfpIndex: 0
    };
  },

  computed: {
    selectedBfp: function() {
      return _.find(this.BFPs, bfp => bfp.index === this.bfpIndex);
    },

    BFPs: function() {
      return [
        {
          index: 0,
          label: "RFM",
          value: this.rfm,
          requiredMsg: "Requires gender, height and waist diameter."
        },
        {
          index: 1,
          label: "Deurenberg",
          value: this.deurenberg,
          requiredMsg: "Requires gender, age, weight and height."
        },
        {
          index: 2,
          label: "US Navy",
          value: this.usNavy,
          requiredMsg:
            "Requires gender, height, waist diameter" +
            (this.isFemale ? ", hip diameter" : "") +
            " and neck diameter."
        }
      ];
    },

    ...mapGetters({
      bmi: "bmi",
      deurenberg: "deurenberg",
      rfm: "rfm",
      usNavy: "usNavy"
    })
  },

  methods: {
    formatNumber: function(number, decimals, unity) {
      if (_.isNumber(number)) {
        let res = decimals ? +number.toFixed(decimals) : number;
        if (unity) {
          res += unity;
        }
        return res;
      }
      return "";
    },

    isNumber: _.isNumber
  }
};
</script>
