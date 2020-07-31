<template>
  <div class="text-small">
    <div class="d-flex align-items-center mb-1">
      <div>
        <em>The American Council on Exercise Body Fat Categorization</em>
      </div>

      <button
        class="btn btn-sm btn-link btn-link-muted p-0 ml-1"
        v-b-popover.click.blur.v-info="POPOVER_CONTENT"
        title="Ideal body fat percentage chart"
        variant="info"
      >
        <i class="fas fa-info-circle"></i>
      </button>
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

import { AmericanCouncilCategories } from "@/utils/constants";

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
      return this.isFemale
        ? AmericanCouncilCategories.FEMALE
        : AmericanCouncilCategories.MALE;
    },

    ...mapGetters({
      isFemale: "isFemale"
    })
  },

  created() {
    this.POPOVER_CONTENT =
      "This body fat percentage chart was created by the American Council on Exercise to provide generic estimates and guidelines for middle-aged people. You should  consult your physician for guidelines that fit you.";
  }
};
</script>
