<template>
  <div class="card text-medium mt-3">
    <div class="card-header pl-2 pr-5 py-1 bg-success-light">
      <!-- BFP Title -->
      <div class="d-flex justify-content-between">
        <div>
          <strong>Body Fat Percentage:</strong>
        </div>
        <div v-for="bfpMethod in BFPs" :key="bfpMethod.index">
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
              <span class="text-muted ml-1">({{ bfpMethod.label }})</span>
            </label>
          </div>
          <transition name="shrink-font">
            <div
              v-if="!isNumber(bfpMethod.value) && bfpMethod.index === bfpIndex"
              class="text-danger"
            >
              <small>* {{ bfpMethod.requiredMsg }}</small>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div class="card-body py-2 px-0">
      <AmericanCouncil class="mt-2" :value="selectedBfp.value" />

      <JacksonPollard class="mt-2" :value="selectedBfp.value" />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";

import AmericanCouncil from "@/components/reports/AmericanCouncil";
import JacksonPollard from "@/components/reports/JacksonPollard";

export default {
  name: "BodyFatPct",

  components: {
    AmericanCouncil,
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
