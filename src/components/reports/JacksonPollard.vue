<template>
  <div class="row">
    <div class="col-sm-6">
      <ColoredProgressBar />
    </div>
    <div class="col-sm-6">
      TODO: Jackson & Pollard Ideal Body Fat Percentages
      <pre>
        Age  Women  Men
        20   17.7%  8.5%
        25   18.4%  10.5%
        30   19.3%  12.7%
        35   21.5%  13.7%
        40   22.2%  15.3%
        45   22.9%  16.4%
        50   25.2%  18.9%
        55   26.3%  20.9%</pre
      >
    </div>
  </div>
</template>

<script>
import ColoredProgressBar from "@/components/charts/ColoredProgressBar";

export default {
  name: "JacksonPollard",

  components: {
    ColoredProgressBar
  },

  props: {
    isFemale: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0
    }
  }
};
</script>
