<template>
  <div class="text-small">
    <div class="d-flex align-items-center mb-1">
      <div><em>Jackson & Pollard Ideal Body Fat Percentages</em></div>

      <button
        class="btn btn-sm btn-link btn-link-muted p-0 ml-1"
        v-b-popover.click.blur.v-info="POPOVER_CONTENT"
        title="Ideal body fat percentage chart"
      >
        <i class="fas fa-info-circle"></i>
      </button>
    </div>

    <table class="table table-bordered mb-0">
      <tbody>
        <tr
          v-for="(row, index) in TABLE"
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
</template>

<script>
import _ from "lodash";
import { mapGetters, mapState } from "vuex";

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

  props: {
    value: {
      type: Number,
      default: null
    }
  },

  computed: {
    activeRows: function() {
      if (!_.isNil(this.age)) {
        const rows = _.filter(this.TABLE, (row, index) => {
          const prevRow = index <= 0 ? null : this.TABLE[index - 1];
          const nextRow =
            index >= this.TABLE.length - 1 ? null : this.TABLE[index + 1];

          return (
            (this.age <= row.age && (!prevRow || this.age > prevRow.age)) ||
            (this.age >= row.age && (!nextRow || this.age < nextRow.age))
          );
        });

        return _.map(rows, row => this.TABLE.indexOf(row));
      }

      return [];
    },

    TABLE: function() {
      return this.isFemale ? TABLE_FEMALE : TABLE_MALE;
    },

    ...mapState({
      age: state => (state.input ? state.input.age : null)
    }),

    ...mapGetters({
      isFemale: "isFemale"
    })
  },

  created() {
    this.POPOVER_CONTENT =
      "This body fat percentage chart is based on a research by Jackson & Pollock to provide generic estimates and guidelines of recommended fat percentage. You should consult your physician for guidelines that fit you.";
  }
};
</script>
