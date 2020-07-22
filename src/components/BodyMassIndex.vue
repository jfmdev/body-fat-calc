<template>
  <div class="card text-medium">
    <div class="card-header px-2 py-1 bg-info-light">
      <strong>Body Mass Index:</strong>
      <span v-swap-fade="isNumber(bmi)">
        {{ formatNumber(bmi, 1, null) }}
      </span>
      <span v-swap-fade="!isNumber(bmi)">
        N/A <small class="text-danger">(requires weight and height)</small>
      </span>
    </div>

    <div class="card-body py-2 px-0">
      <div class="row align-items-center">
        <div class="col-lg-4 col-md-5 col-sm-6">
          <table class="table table-bordered text-small mb-0">
            <tbody>
              <tr
                v-for="(row, index) in table"
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

        <div class="col-lg-4 col-md-5 col-sm-6 offset-lg-4 offset-md-2">
          <BodySilhouette :range="range" :value="value" />

          <ColoredProgressBar :range="range" :value="value" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";

import { ChartColors } from "@/utils/constants";
import BodySilhouette from "@/components/charts/BodySilhouette";
import ColoredProgressBar from "@/components/charts/ColoredProgressBar";

const RANGE = [
  { value: 10, color: ChartColors.DANGER, body: "thin" },
  { value: 15, color: ChartColors.WARNING, body: "thin" },
  { value: 18.5, color: ChartColors.GOOD, body: "normal" },
  { value: 21.75, color: ChartColors.EXCELLENT, body: "strong" },
  { value: 25, color: ChartColors.GOOD, body: "normal" },
  { value: 30, color: ChartColors.WARNING, body: "overweight" },
  { value: 40, color: ChartColors.DANGER, body: "obese" }
];

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

  components: {
    BodySilhouette,
    ColoredProgressBar
  },

  data() {
    return {
      range: RANGE,
      table: TABLE
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
        return row ? TABLE.indexOf(row) : null;
      }
      return null;
    },

    ...mapGetters({
      value: "bmi"
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
