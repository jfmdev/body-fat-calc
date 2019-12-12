<template>
  <div class="colored-progress-bar" :style="backgroundStyle">
    <div class="colored-progress-bar_arrow" :style="arrowStyle">
      <i class="fas fa-play fa-rotate-90"></i>
    </div>
  </div>
</template>

<script>
import { ChartColors } from "@/utils/constants";

export default {
  name: "ColoredProgressBar",

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
    arrowStyle: function() {
      let left = "50%";

      if (this.range && !_.isNil(this.value)) {
        const min = this.range[0].value;
        const max = this.range[this.range.length - 1].value;

        let percentage = Math.floor((100 * (this.value - min)) / (max - min));
        if (percentage < 0) percentage = 0;
        else if (percentage > 100) percentage = 100;
        left = `${percentage}%`;
      }

      return { left };
    },

    backgroundStyle: function() {
      if (this.range && !_.isNil(this.value)) {
        const min = this.range[0].value;
        const max = this.range[this.range.length - 1].value;

        let gradient = "";
        for (let i = 0; i < this.range.length; i++) {
          if (i > 0) {
            gradient += ", ";
          }
          const percentage = Math.floor(
            (100 * (this.range[i].value - min)) / (max - min)
          );
          gradient += `${this.range[i].color} ${percentage}%`;
        }

        return {
          "background-image": `linear-gradient(to right, ${gradient})`
        };
      }

      return null;
    }
  }
};
</script>
