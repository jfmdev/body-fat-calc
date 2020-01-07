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
          <span v-swap-fade="isNumber(BMI)">
            {{ formatNumber(BMI, 1, null) }}
          </span>
          <span v-swap-fade="!isNumber(BMI)">
            N/A <span class="text-danger">(requires weight and height)</span>
          </span>
        </div>

        <BMIRange :value="BMI" />
      </div>
      <!-- BMI (end) -->

      <!-- BFP (start) -->
      <div class="mt-3">
        <!-- BFP Title -->
        <div class="row">
          <div class="col">
            <strong>Body Fat Percentage:</strong>
          </div>
          <div class="col" v-for="method in METHODS" :key="method.index">
            <div class="form-check">
              <input
                class="form-check-input clickable"
                type="radio"
                :value="method.index"
                v-model="methodIndex"
              />
              <label
                @click="methodIndex = method.index"
                class="form-check-label clickable"
              >
                <span :class="{ 'text-muted': method.index !== methodIndex }">
                  <span v-if="isNumber(values[method.field])">
                    {{
                      formatNumber(
                        values[method.field],
                        method.decimals,
                        method.unity
                      )
                    }}
                  </span>
                  <small v-if="!isNumber(values[method.field])">
                    N/A<span
                      class="text-danger"
                      v-if="method.index === methodIndex"
                      >*</span
                    >
                  </small>
                </span>
                <span class="text-muted">({{ method.label }})</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Error messages for missing fields -->
        <transition name="shrink-font">
          <div
            v-if="!isNumber(values[selectedMethod.field])"
            class="text-danger"
          >
            * {{ selectedMethod.requiredMsg }}
          </div>
        </transition>

        <AmericanCouncil class="mt-2" :value="BFP" :is-female="isFemale" />

        <JacksonPollard class="mt-2" :value="BFP" :is-female="isFemale" />
      </div>
      <!-- BFP (end) -->
    </div>
  </div>
</template>

<script>
import _ from "lodash";

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

  data: function() {
    return {
      methodIndex: 0
    };
  },

  computed: {
    selectedMethod: function() {
      return _.find(this.METHODS, method => method.index === this.methodIndex);
    },

    BFP: function() {
      return this.getValue(this.selectedMethod.field);
    },

    BMI: function() {
      return this.getValue("bmi");
    },

    METHODS: function() {
      return [
        {
          index: 0,
          label: "RFM",
          field: "rfm",
          decimals: 2,
          unity: "%",
          requiredMsg: "Requires gender, height and waist diameter."
        },
        {
          index: 1,
          label: "Deurenberg",
          field: "deurenberg",
          decimals: 2,
          unity: "%",
          requiredMsg: "Requires gender, age, weight and height."
        },
        {
          index: 2,
          label: "US Navy",
          field: "usNavy",
          decimals: 2,
          unity: "%",
          requiredMsg:
            "Requires gender, height, waist diameter" +
            (this.isFemale ? ", hip diameter" : "") +
            " and neck diameter."
        }
      ];
    }
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

    getValue: function(field) {
      return _.isObject(this.values) && !_.isNil(this.values[field])
        ? this.values[field]
        : null;
    },

    isNumber: _.isNumber
  }
};
</script>
