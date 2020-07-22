<template>
  <div class="card text-medium">
    <div class="card-header px-2 py-1 bg-success-light">
      <div class="d-flex align-items-center">
        <div class="flex-1 container-fluid">
          <div class="row">
            <div class="col-md-6 px-0">
              <strong>Body Fat Percentage:</strong>

              <transition name="fade" mode="out-in">
                <span
                  v-if="!!selectedBfp && isNumber(selectedBfp.value)"
                  key="value"
                >
                  {{ formatNumber(selectedBfp.value, 2, "%") }}
                </span>
                <span v-else key="na">
                  N/A
                  <small class="text-danger"
                    >({{ selectedBfp.requiredMsg }})</small
                  >
                </span>
              </transition>
            </div>

            <div class="col-md-6 px-0">
              Method:
              <div
                class="form-check form-check-inline mx-1"
                v-for="bfpMethod in BFPs"
                :key="bfpMethod.index"
              >
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
                  <small>{{ bfpMethod.label }}</small>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button class="btn px-1 py-0" @click="toggleExpanded">
            <i
              class="fas"
              :class="
                expanded ? 'fa-chevron-circle-up' : 'fa-chevron-circle-down'
              "
            ></i>
          </button>
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
import Vue from "vue";
import { mapGetters } from "vuex";

import { NumericUtils } from "@/utils/mixins";
import { StorageKeys } from "@/utils/constants";
import AmericanCouncil from "@/components/reports/AmericanCouncil";
import JacksonPollard from "@/components/reports/JacksonPollard";

export default {
  name: "BodyFatPct",

  mixins: [NumericUtils],

  components: {
    AmericanCouncil,
    JacksonPollard
  },

  data: function() {
    return {
      bfpIndex: Vue.localStorage.get(StorageKeys.BFP_METHOD, 0, Number),
      expanded: Vue.localStorage.get(StorageKeys.EXPAND_BFP) === "true"
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
          requiredMsg: "requires gender, height and waist diameter"
        },
        {
          index: 1,
          label: "Deurenberg",
          value: this.deurenberg,
          requiredMsg: "requires gender, age, weight and height"
        },
        {
          index: 2,
          label: "US Navy",
          value: this.usNavy,
          requiredMsg:
            "requires gender, height, waist diameter" +
            (this.isFemale ? ", hip diameter" : "") +
            " and neck diameter"
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

  watch: {
    bfpIndex: newIndex => Vue.localStorage.set(StorageKeys.BFP_METHOD, newIndex)
  },

  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded;
      Vue.localStorage.set(StorageKeys.EXPAND_BFP, this.expanded);
    }
  }
};
</script>
