<template>
  <div class="card text-medium">
    <div class="card-header px-2 py-1 bg-info-light">
      <div class="d-flex align-items-center">
        <div class="flex-1">
          <strong>Body Mass Index:</strong>

          <transition name="fade" mode="out-in">
            <span v-if="isNumber(value)" key="value">
              {{ formatNumber(value, 1, null) }}
              <transition name="fade-x2">
                <span v-if="!expanded && activeRow >= 0" class="text-muted">
                  ({{ TABLE[activeRow].description.toLowerCase() }})
                </span>
              </transition>
            </span>
            <span v-else key="na">
              N/A
              <small class="text-danger">(requires weight and height)</small>
            </span>
          </transition>
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

    <transition name="fade-x2">
      <div v-if="expanded" class="card-body py-2 px-0">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-md-6">
              <table class="table table-bordered text-small mb-0">
                <tbody>
                  <tr
                    v-for="(row, index) in TABLE"
                    class="table-bg-anim"
                    :class="{ 'table-info': index === activeRow }"
                    :key="index"
                  >
                    <td class="py-1 px-1">{{ row.title }}</td>
                    <td class="py-1 px-1">{{ row.description }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="col-md-6">
              <p class="mb-1">
                The Body Mass Index (BMI) is a measure that allows the
                comparison of the adiposity of individuals of different heights
                and weights, and to broadly categorize a person as underweight,
                normal weight, overweight, or obese.
              </p>
              <p class="mb-0">
                The BMI is a useful indicator of overall fitness for a large
                group of people, but a poor tool for determining the health of
                an individual (although the BMI largely increases as adiposity
                increases, other factors like greater muscle mass or larger
                bones also increase it).
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import _ from "lodash";
import Vue from "vue";
import { mapGetters } from "vuex";

import { NumericUtils } from "@/utils/mixins";
import { StorageKeys } from "@/utils/constants";

const TABLE = [
  {
    min: null,
    max: 18.5,
    title: "Below 18.5",
    description: "You're in the underweight range"
  },
  {
    min: 18.5,
    max: 25,
    title: "Between 18.5 and 25",
    description: "You're in the healthy weight range"
  },
  {
    min: 25,
    max: 30,
    title: "Between 25 and 30",
    description: "You're in the underweight range"
  },
  {
    min: 30,
    max: null,
    title: "Above 30",
    description: "You're in the obese range"
  }
];

export default {
  name: "BodyMassIndex",

  mixins: [NumericUtils],

  data() {
    return {
      expanded: Vue.localStorage.get(StorageKeys.EXPAND_BMI) === "true"
    };
  },

  computed: {
    activeRow: function() {
      if (!_.isNil(this.value)) {
        const row = _.find(
          TABLE,
          row =>
            (!row.min || this.value >= row.min) &&
            (!row.max || this.value < row.max)
        );
        return row ? TABLE.indexOf(row) : -1;
      }
      return -1;
    },

    ...mapGetters({
      value: "bmi"
    })
  },

  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded;
      Vue.localStorage.set(StorageKeys.EXPAND_BMI, this.expanded);
    }
  },

  created() {
    this.TABLE = TABLE;
  }
};
</script>
