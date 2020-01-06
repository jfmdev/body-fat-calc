<template>
  <div class="row align-items-center">
    <div class="col-sm-5">
      <BodySilhouette :range="range" :value="value" />

      <ColoredProgressBar :range="range" :value="value" />
    </div>
    <div class="col-sm-7">
      <table class="table table-bordered text-medium mb-0">
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
  name: "BMIRange",

  components: {
    BodySilhouette,
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
