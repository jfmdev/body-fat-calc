<template>
  <div class="row align-items-center">
    <div class="col-sm-5">
      TODO: Healty icon (perhaps with color)
      <ColoredProgressBar :range="range" :value="value" />
    </div>
    <div class="col-sm-7">
      <table class="table table-bordered text-medium">
        <thead>
          <tr>
            <th scope="col" class="py-1 px-2">BMI</th>
            <th scope="col" class="py-1 px-2">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in table"
            :class="{ 'table-info': index === activeRow }"
            :key="index"
          >
            <td class="py-1 px-2">{{ row.title }}</td>
            <td class="py-1 px-2">{{ row.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

import { ChartColors } from "@/utils/constants";
import ColoredProgressBar from "@/components/charts/ColoredProgressBar";

const RANGE = [
  { value: 10, color: ChartColors.DANGER },
  { value: 15, color: ChartColors.WARNING },
  { value: 18.5, color: ChartColors.GOOD },
  { value: 21.75, color: ChartColors.EXCELLENT },
  { value: 25, color: ChartColors.GOOD },
  { value: 30, color: ChartColors.WARNING },
  { value: 40, color: ChartColors.DANGER }
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
    description: "you're in the healthy weight range"
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
  name: "BMIRange",

  components: {
    ColoredProgressBar
  },

  props: {
    value: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      range: RANGE,
      table: TABLE
    };
  },

  computed: {
    activeRow: function() {
      if (!_.isNil(this.value) && this.value > 0) {
        const row = _.find(
          TABLE,
          row =>
            (!row.min || this.value >= row.min) &&
            (!row.max || this.value < row.max)
        );
        return row ? TABLE.indexOf(row) : null;
      }
      return null;
    }
  }
};
</script>
