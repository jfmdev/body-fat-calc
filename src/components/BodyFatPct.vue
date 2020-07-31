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
                  v-if="selectedMethod && isNumber(selectedMethod.value)"
                  key="value"
                >
                  {{ formatNumber(selectedMethod.value, 2, "%") }}
                </span>
                <span v-else key="na">
                  N/A
                  <small class="text-danger" v-if="selectedMethod"
                    >({{ selectedMethod.requiredMsg }})</small
                  >
                </span>
              </transition>
            </div>

            <div class="col-md-6 px-0 d-flex align-items-center">
              <div>Method:</div>
              <div
                class="form-check form-check-inline mx-1"
                v-for="bfpMethod in availableMethods"
                :key="bfpMethod.key"
              >
                <input
                  class="form-check-input clickable"
                  type="radio"
                  :checked="
                    selectedMethod && selectedMethod.key === bfpMethod.key
                  "
                  @click="selectedMethod = bfpMethod"
                />
                <label
                  @click="selectedMethod = bfpMethod"
                  class="form-check-label clickable pb-1"
                >
                  <small>{{ bfpMethod.label }}</small>
                </label>
              </div>

              <button
                class="btn btn-sm btn-link btn-link-info p-0 ml-1"
                v-b-popover.html.click.blur.v-info="METHODS_DESCRIPTION"
                title="Estimation methods"
                variant="info"
              >
                <i class="fas fa-info-circle"></i>
              </button>
            </div>
          </div>
        </div>

        <div>
          <button
            class="btn btn-link btn-link-dark px-1 py-0"
            @click="toggleExpanded"
          >
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

    <div class="card-body p-2">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-md-6 mb-2">
            <BodySilhouette :range="bodyFatRange" :value="selectedBfp" />

            <ColoredProgressBar :range="bodyFatRange" :value="selectedBfp" />
          </div>

          <transition name="fade-x2">
            <div v-if="expanded" class="col-md-6 mb-2">
              <p class="mb-1">
                The Body Fat Percentage (BFP) is a measure of fitness level,
                calculated by dividing the total mass of fat divided by total
                body mass.
              </p>
              <p class="mb-1">
                Body fat includes essential body (necessary to maintain life and
                reproductive functions) fat and storage body fat (which consists
                of fat accumulation in adipose tissue).
              </p>
              <p class="mb-0">
                It must be noted that the percentage of essential body fat for
                women is greater than that for men, due to the demands of
                childbearing and other hormonal functions.
              </p>
            </div>
          </transition>

          <div class="col-md-6 mb-2">
            <AmericanCouncil :value="selectedBfp" />
          </div>

          <transition name="fade-x2">
            <div v-if="expanded" class="col-md-6 mb-2">
              <JacksonPollard class="mt-2" :value="selectedBfp" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import Vue from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";

import { NumericUtils } from "@/utils/mixins";
import { FatPercentageRanges, StorageKeys } from "@/utils/constants";
import AmericanCouncil from "@/components/tables/AmericanCouncil";
import BodySilhouette from "@/components/charts/BodySilhouette";
import ColoredProgressBar from "@/components/charts/ColoredProgressBar";
import JacksonPollard from "@/components/tables/JacksonPollard";

export default {
  name: "BodyFatPct",

  mixins: [NumericUtils],

  components: {
    AmericanCouncil,
    BodySilhouette,
    ColoredProgressBar,
    JacksonPollard
  },

  data: function() {
    return {
      expanded: Vue.localStorage.get(StorageKeys.EXPAND_BFP) !== "false"
    };
  },

  computed: {
    bodyFatRange: function() {
      return this.isFemale
        ? FatPercentageRanges.FEMALE
        : FatPercentageRanges.MALE;
    },

    selectedMethod: {
      get() {
        return _.find(
          this.availableMethods,
          bfpMethod => bfpMethod.key === this.methodKey
        );
      },
      set(newMethod) {
        this.commitMethodKey(_.isObject(newMethod) ? newMethod.key : newMethod);
      }
    },

    selectedBfp: function() {
      return this.selectedMethod ? this.selectedMethod.value : null;
    },

    availableMethods: function() {
      return [
        {
          key: "usNavy",
          label: "US Navy",
          value: this.usNavy,
          requiredMsg:
            "requires gender, height, waist diameter" +
            (this.isFemale ? ", hip diameter" : "") +
            " and neck diameter"
        },
        {
          key: "rfm",
          label: "RFM",
          value: this.rfm,
          requiredMsg: "requires gender, height and waist diameter"
        },
        {
          key: "deurenberg",
          label: "Deurenberg",
          value: this.deurenberg,
          requiredMsg: "requires gender, age, weight and height"
        }
      ];
    },

    ...mapState({
      methodKey: state => state.bfpMethod
    }),

    ...mapGetters({
      deurenberg: "deurenberg",
      rfm: "rfm",
      usNavy: "usNavy"
    })
  },

  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded;
      Vue.localStorage.set(StorageKeys.EXPAND_BFP, this.expanded);
    },

    ...mapMutations({
      commitMethodKey: "bfpMethod"
    })
  },

  created() {
    this.METHODS_DESCRIPTION = `<div>
        They are several methods you can use to <em>estimate</em> (since measuring requires sophisticated equipment) the percentage of body fat:
        <ol>
          <li><strong>RFM:</strong> the Relative Fat Mass index is a method developed by investigators from the Cedars-Sinai Medical Center, who examined more than 300 possible formulas for estimating body fat, using a database of 12,000 adults, and then confirmed their results by measuring the fat percentage of 3,500 patients.</li>
          <li><strong>US Navy:</strong> is an equation developed at the Naval Health Research Center by Hodgdon and Beckett in 1984, and currently used by the US Navy on their service members.</li>
          <li><strong>Deurenberg:</strong> is a revision of the Body Mass Index formula, which adds coefficients for the age and sex. Isn't very accurate and should be used only as a orientative value.</li>
        </ol>
        Please note that these methods were developed to be applied on middle aged people.
      </div>`;
  }
};
</script>
