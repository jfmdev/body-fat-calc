<template>
  <div>
    <ColoredProgressBar :range="range" :value="value" />
    TODO: BMI Range
    <pre>
      If your BMI is:
      below 18.5 – you're in the underweight range
      between 18.5 and 24.9 – you're in the healthy weight range
      between 25 and 29.9 – you're in the overweight range
      between 30 and 39.9 – you're in the obese range</pre
    >
  </div>
</template>

<script>
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
      range: RANGE
    };
  }
};
</script>
