<template>
  <div>
    <ul class="nav nav-tabs">
      <li class="nav-item" v-for="tab in TABS" :key="tab.index">
        <a
          class="nav-link"
          href
          @click.prevent="tabIndex = tab.index"
          :class="{
            active: tabIndex === tab.index,
            'text-muted': tabIndex !== tab.index
          }"
        >
          <span :class="{ 'font-weight-bold': tabIndex === tab.index }"
            >{{ tab.label }}:
          </span>
          {{ formatNumber(values[tab.field], tab.decimals, tab.unity) }}
        </a>
      </li>
    </ul>

    <div class="border border-top-0 p-2">
      <!-- Show error messages for missing fields -->
      <transition name="shrink-font">
        <div v-if="!values[selectedTab.field]" class="text-danger">
          {{ selectedTab.requiredMsg }}
        </div>
      </transition>

      <AmericanCouncil />

      <JacksonPollard />

      <BMIRange />
    </div>
  </div>
</template>

<script>
import _ from "lodash";

import AmericanCouncil from "@/components/charts/AmericanCouncil";
import BMIRange from "@/components/charts/BMIRange";
import JacksonPollard from "@/components/charts/JacksonPollard";

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
      tabIndex: 0
    };
  },

  computed: {
    selectedTab: function() {
      return _.find(this.TABS, tab => tab.index === this.tabIndex);
    },

    TABS: function() {
      return [
        {
          index: 0,
          label: "BMI",
          field: "bmi",
          decimals: 1,
          unity: null,
          requiredMsg: "Requires weight and height."
        },
        {
          index: 1,
          label: "RFM",
          field: "rfm",
          decimals: 2,
          unity: "%",
          requiredMsg: "Requires gender, height and waist diameter."
        },
        {
          index: 2,
          label: "Deurenberg",
          field: "deurenberg",
          decimals: 2,
          unity: "%",
          requiredMsg: "Requires gender, age, weight and height."
        },
        {
          index: 3,
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
