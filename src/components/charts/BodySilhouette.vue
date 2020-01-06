<template>
  <div class="body-silhouette" :style="colorAndMask"></div>
</template>

<script>
import _ from "lodash";
import TinyColor from "tinycolor2";

export default {
  name: "BodySilhouette",

  props: {
    range: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number,
      default: 0
    }
  },

  computed: {
    colorAndMask: function() {
      let bodyType = "normal";
      let bodyColor = "#000";

      if (this.range && this.range.length && !_.isNil(this.value)) {
        if (this.value <= this.range[0].value) {
          // Value if bellow the range.
          bodyType = this.range[0].body;
          bodyColor = this.range[0].color;
        } else if (this.value >= this.range[this.range.length - 1].value) {
          // Value is above the range.
          bodyType = this.range[this.range.length - 1].body;
          bodyColor = this.range[this.range.length - 1].color;
        } else {
          // Value is between the range.
          for (let i = 1; i < this.range.length; i++) {
            if (
              this.value >= this.range[i - 1].value &&
              this.value <= this.range[i].value
            ) {
              const middleValue =
                (this.range[i - 1].value + this.range[i].value) / 2;
              bodyType = this.range[this.value < middleValue ? i - 1 : i].body;

              const percentage =
                (this.range[i].value - this.value) /
                (this.range[i].value - this.range[i - 1].value);
              bodyColor = TinyColor.mix(
                this.range[i].color,
                this.range[i - 1].color,
                percentage * 100
              );
            }
          }
        }
      }

      return {
        "background-color": bodyColor,
        "-webkit-mask": `url(svg/${bodyType}.svg) no-repeat center`,
        mask: `url(svg/${bodyType}.svg) no-repeat center`
      };
    }
  }
};
</script>
