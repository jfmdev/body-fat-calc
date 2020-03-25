<template>
  <div class="row align-items-center">
    <div class="col-sm-7">
      <div class="mb-1">
        <em>Jackson & Pollard Ideal Body Fat Percentages</em>
      </div>
      <table class="table table-bordered text-small mb-0">
        <tbody>
          <tr
            v-for="(row, index) in table"
            class="table-bg-anim"
            :class="{ 'table-secondary': activeRows.indexOf(index) >= 0 }"
            :key="index"
          >
            <td class="py-1 px-2">{{ row.age }} years</td>
            <td class="py-1 px-2">{{ row.value }}%</td>
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
import { mapGetters, mapState } from "vuex";

import { ChartColors } from "@/utils/constants";
import BodySilhouette from "@/components/charts/BodySilhouette";
import ColoredProgressBar from "@/components/charts/ColoredProgressBar";

const TABLE_FEMALE = [
  { age: 20, value: 17.7 },
  { age: 25, value: 18.4 },
  { age: 30, value: 19.3 },
  { age: 35, value: 21.5 },
  { age: 40, value: 22.2 },
  { age: 45, value: 22.9 },
  { age: 50, value: 25.2 },
  { age: 55, value: 26.3 }
];

const TABLE_MALE = [
  { age: 20, value: 8.5 },
  { age: 25, value: 10.5 },
  { age: 30, value: 12.7 },
  { age: 35, value: 13.7 },
  { age: 40, value: 15.3 },
  { age: 45, value: 16.4 },
  { age: 50, value: 18.9 },
  { age: 55, value: 20.9 }
];

export default {
  name: "JacksonPollard",

  components: {
    BodySilhouette,
    ColoredProgressBar
  },

  props: {
    value: {
      type: Number,
      default: null
    }
  },

  computed: {
    activeRows: function() {
      if (!_.isNil(this.age)) {
        const rows = _.filter(this.table, (row, index) => {
          const prevRow = index <= 0 ? null : this.table[index - 1];
          const nextRow =
            index >= this.table.length - 1 ? null : this.table[index + 1];

          return (
            (this.age <= row.age && (!prevRow || this.age > prevRow.age)) ||
            (this.age >= row.age && (!nextRow || this.age < nextRow.age))
          );
        });

        return _.map(rows, row => this.table.indexOf(row));
      }

      return [];
    },

    range: function() {
      let idealValue = this.table[0].value;
      if (this.activeRows.length === 1) {
        idealValue = this.table[this.activeRows[0]].value;
      } else if (this.activeRows.length === 2) {
        const a = this.table[this.activeRows[0]];
        const b = this.table[this.activeRows[1]];
        const mix = (b.age - this.age) / (b.age - a.age);
        idealValue = (1 - mix) * b.value + mix * a.value;
      }

      return [
        { value: idealValue - 6, color: ChartColors.WARNING, body: "thin" },
        { value: idealValue - 3, color: ChartColors.GOOD, body: "normal" },
        { value: idealValue, color: ChartColors.EXCELLENT, body: "strong" },
        { value: idealValue + 3, color: ChartColors.GOOD, body: "normal" },
        {
          value: idealValue + 6,
          color: ChartColors.WARNING,
          body: "overweight"
        }
      ];
    },

    table: function() {
      return this.isFemale ? TABLE_FEMALE : TABLE_MALE;
    },

    ...mapState({
      age: state => (state.input ? state.input.age : null)
    }),

    ...mapGetters({
      isFemale: "isFemale"
    })
  }
};
</script>
