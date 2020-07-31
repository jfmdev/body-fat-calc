<template>
  <div class="card text-medium">
    <div class="card-header px-2 py-1 bg-warning-light">
      <div class="d-flex align-items-center">
        <div class="flex-1">
          <strong>Body composition</strong>
        </div>

        <transition name="fade-x2">
          <div class="flex-1" v-if="leanMass && !expanded">
            Lean mass: {{ formatNumber(leanMass, 1) }} {{ weightUnit }}
          </div>
        </transition>

        <transition name="fade-x2">
          <div class="flex-1" v-if="fatMass && !expanded">
            Fat mass: {{ formatNumber(fatMass, 1) }} {{ weightUnit }}
          </div>
        </transition>

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
      <div v-if="expanded" class="card-body py-0 px-3">
        <table class="table text-small mb-0">
          <tbody>
            <tr>
              <td class="border-top-0 text-right">Fat mass:</td>
              <td class="border-top-0">
                {{ formatNumber(fatMass, 1) }} {{ weightUnit }}
              </td>
              <td class="border-top-0 text-right">Lean mass:</td>
              <td class="border-top-0">
                {{ formatNumber(leanMass, 1) }} {{ weightUnit }}
              </td>
            </tr>
            <tr>
              <td class="text-right">
                Ideal fat mass for given age<span
                  class="text-primary font-weight-bold"
                  v-b-popover.hover.v-info="
                    'Based on the estimations from Jackson and Pollard'
                  "
                  >*</span
                >:
              </td>
              <td>{{ formatNumber(idealFatForAge, 1) }} {{ weightUnit }}</td>
              <td class="text-right">
                Body fat to {{ idealFatForAge > fatMass ? "gain" : "lose" }} to
                reach ideal:
              </td>
              <td
                :class="{
                  'text-success': idealFatForAge - fatMass >= 0.1,
                  'text-danger': idealFatForAge - fatMass <= -0.1
                }"
              >
                {{ formatNumber(idealFatForAge - fatMass, 1) }} {{ weightUnit }}
              </td>
            </tr>
            <tr>
              <td class="text-right">
                Ideal fat mass for athlete category<span
                  class="text-primary font-weight-bold"
                  v-b-popover.hover.v-info="
                    'Based on the categorization from the American Council'
                  "
                  >*</span
                >:
              </td>
              <td>
                {{ formatNumber(idealFatForAthlete, 1) }} {{ weightUnit }}
              </td>
              <td class="text-right">
                Body fat to
                {{ idealFatForAthlete > fatMass ? "gain" : "lose" }} to reach
                athlete category:
              </td>
              <td
                :class="{
                  'text-success': idealFatForAthlete - fatMass >= 0.1,
                  'text-danger': idealFatForAthlete - fatMass <= -0.1
                }"
              >
                {{ formatNumber(idealFatForAthlete - fatMass, 1) }}
                {{ weightUnit }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>
  </div>
</template>

<script>
import _ from "lodash";
import Vue from "vue";
import { mapGetters, mapState } from "vuex";

import { NumericUtils } from "@/utils/mixins";
import {
  AmericanCouncilCategories,
  JacksonAndPollardPercentages,
  StorageKeys
} from "@/utils/constants";

export default {
  name: "Stats",

  mixins: [NumericUtils],

  data() {
    return {
      expanded: Vue.localStorage.get(StorageKeys.EXPAND_STATS) === "true"
    };
  },

  computed: {
    fatMass: function() {
      if (this.fatPercentage && this.weight) {
        return (this.weight * this.fatPercentage) / 100;
      }
      return null;
    },

    leanMass: function() {
      if (!_.isNil(this.fatMass)) {
        return this.weight - this.fatMass;
      }
      return null;
    },

    idealFatForAge: function() {
      let fatPct = null;

      if (this.age && this.leanMass) {
        const table = this.isFemale
          ? JacksonAndPollardPercentages.FEMALE
          : JacksonAndPollardPercentages.MALE;

        for (let i = 0; i < table.length && fatPct === null; i++) {
          if (this.age === table[i].age) {
            fatPct = table[i].value;
          } else if (
            i < table.length - 1 &&
            this.age > table[i].age &&
            this.age < table[i + 1].age
          ) {
            const alpha =
              (this.age - table[i].age) / (table[i + 1].age - table[i].age);
            fatPct = (1 - alpha) * table[i].value + alpha * table[i + 1].value;
          }
        }
      }

      return fatPct !== null ? (this.leanMass / (100 - fatPct)) * fatPct : null;
    },

    idealFatForAthlete: function() {
      let fatPct = null;

      if (this.fatPercentage) {
        const athleteCategory = _.find(
          this.isFemale
            ? AmericanCouncilCategories.FEMALE
            : AmericanCouncilCategories.MALE,
          category => category.title === "Athletes"
        );

        const minPct = athleteCategory.min + 1;
        const maxPct = athleteCategory.max;

        if (this.fatPercentage < minPct) {
          fatPct = minPct;
        } else if (this.fatPercentage > maxPct) {
          fatPct = maxPct;
        } else {
          fatPct = this.fatPercentage;
        }
      }

      return fatPct !== null ? (this.leanMass / (100 - fatPct)) * fatPct : null;
    },

    ...mapState({
      age: state => (state.input ? state.input.age : null),
      weight: state => (state.input ? state.input.weight : null)
    }),

    ...mapGetters({
      fatPercentage: "selectedBfp",
      isFemale: "isFemale",
      weightUnit: "weightUnit"
    })
  },

  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded;
      Vue.localStorage.set(StorageKeys.EXPAND_STATS, this.expanded);
    }
  }
};
</script>
