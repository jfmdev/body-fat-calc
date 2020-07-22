import _ from "lodash";

export const NumericUtils = {
  methods: {
    formatNumber: function(number, decimals, unity) {
      if (_.isNumber(number)) {
        let res = decimals ? +number.toFixed(decimals) : number;
        if (unity) {
          res += unity;
        }
        return res;
      }
      return "";
    },

    isNumber: _.isNumber
  }
};

export default {
  NumericUtils
};
