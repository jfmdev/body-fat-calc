<template>
  <div class="row align-items-center">
    <div class="col-sm-7">
      <div class="mb-1">
        <em>The American Council on Exercise Body Fat Categorization</em>
      </div>
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
    <div class="col-sm-5">
      <BodySilhouette :range="range" :value="value" />

      <ColoredProgressBar :range="range" :value="value" />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";

import { ChartColors } from "@/utils/constants";
import BodySilhouette from "@/components/charts/BodySilhouette";
import ColoredProgressBar from "@/components/charts/ColoredProgressBar";

const RANGE_FEMALE = [
  { value: 8, color: ChartColors.DANGER, body: "thin" },
  { value: 10, color: ChartColors.DANGER, body: "thin" },
  { value: 11.5, color: ChartColors.WARNING, body: "thin" },
  { value: 14, color: ChartColors.GOOD, body: "normal" },
  { value: 17, color: ChartColors.EXCELLENT, body: "strong" },
  { value: 28, color: ChartColors.GOOD, body: "normal" },
  { value: 31, color: ChartColors.WARNING, body: "overweight" },
  { value: 32, color: ChartColors.DANGER, body: "obese" },
  { value: 34, color: ChartColors.DANGER, body: "obese" }
];

const RANGE_MALE = [
  { value: 0, color: ChartColors.DANGER, body: "thin" },
  { value: 2, color: ChartColors.DANGER, body: "thin" },
  { value: 3.5, color: ChartColors.WARNING, body: "thin" },
  { value: 6, color: ChartColors.GOOD, body: "normal" },
  { value: 9.5, color: ChartColors.EXCELLENT, body: "strong" },
  { value: 21.5, color: ChartColors.GOOD, body: "normal" },
  { value: 25, color: ChartColors.WARNING, body: "overweight" },
  { value: 26, color: ChartColors.DANGER, body: "obese" },
  { value: 28, color: ChartColors.DANGER, body: "obese" }
];

const TABLE_FEMALE = [
  {
    title: "Dangerous",
    min: null,
    max: 10,
    description: "< 10%"
  },
  {
    title: "Essential fat",
    min: 10,
    max: 13,
    description: "10-13%"
  },
  {
    title: "Athletes",
    min: 13,
    max: 20,
    description: "14-20%"
  },
  {
    title: "Fitness",
    min: 20,
    max: 24,
    description: "21-24%"
  },
  {
    title: "Average",
    min: 24,
    max: 31,
    description: "25-31%"
  },
  {
    title: "Obese",
    min: 31,
    max: null,
    description: "> 31%"
  }
];

const TABLE_MALE = [
  {
    title: "Dangerous",
    min: null,
    max: 2,
    description: "< 2%"
  },
  {
    title: "Essential fat",
    min: 2,
    max: 5,
    description: "2-5%"
  },
  {
    title: "Athletes",
    min: 5,
    max: 13,
    description: "6-13%"
  },
  {
    title: "Fitness",
    min: 13,
    max: 17,
    description: "14-17%"
  },
  {
    title: "Average",
    min: 17,
    max: 25,
    description: "18-25%"
  },
  {
    title: "Obese",
    min: 25,
    max: null,
    description: "> 25%"
  }
];

export default {
  name: "AmericanCouncil",

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

  computed: {
    activeRow: function() {
      if (!_.isNil(this.value)) {
        const row = _.find(
          this.table,
          row =>
            (!row.min || this.value >= row.min) &&
            (!row.max || this.value < row.max)
        );
        return row ? this.table.indexOf(row) : null;
      }
      return null;
    },

    range: function() {
      return this.isFemale ? RANGE_FEMALE : RANGE_MALE;
    },

    table: function() {
      return this.isFemale ? TABLE_FEMALE : TABLE_MALE;
    },

    ...mapGetters({
      isFemale: "isFemale"
    })
  }
};
</script>
