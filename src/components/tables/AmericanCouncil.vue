<template>
  <div class="text-small">
    <div class="mb-1">
      <em>The American Council on Exercise Body Fat Categorization</em>
    </div>
    <table class="table table-bordered mb-0">
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
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";

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
          this.TABLE,
          row =>
            (!row.min || this.value >= row.min) &&
            (!row.max || this.value < row.max)
        );
        return row ? this.TABLE.indexOf(row) : null;
      }
      return null;
    },

    TABLE: function() {
      return this.isFemale ? TABLE_FEMALE : TABLE_MALE;
    },

    ...mapGetters({
      isFemale: "isFemale"
    })
  }
};
</script>
