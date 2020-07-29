export const ChartColors = {
  DANGER: "#f00",
  EXCELLENT: "#0c0",
  GOOD: "#0f0",
  WARNING: "#ee0"
};

export const IN_TO_CM = 2.54;
export const LBS_TO_KG = 0.45359237;

export const FatPercentageRanges = {
  FEMALE: [
    { value: 8, color: ChartColors.DANGER, body: "thin" },
    { value: 10, color: ChartColors.DANGER, body: "thin" },
    { value: 11.5, color: ChartColors.WARNING, body: "thin" },
    { value: 14, color: ChartColors.GOOD, body: "normal" },
    { value: 17, color: ChartColors.EXCELLENT, body: "strong" },
    { value: 28, color: ChartColors.GOOD, body: "normal" },
    { value: 31, color: ChartColors.WARNING, body: "overweight" },
    { value: 32, color: ChartColors.DANGER, body: "obese" },
    { value: 34, color: ChartColors.DANGER, body: "obese" }
  ],
  MALE: [
    { value: 0, color: ChartColors.DANGER, body: "thin" },
    { value: 2, color: ChartColors.DANGER, body: "thin" },
    { value: 3.5, color: ChartColors.WARNING, body: "thin" },
    { value: 6, color: ChartColors.GOOD, body: "normal" },
    { value: 9.5, color: ChartColors.EXCELLENT, body: "strong" },
    { value: 21.5, color: ChartColors.GOOD, body: "normal" },
    { value: 25, color: ChartColors.WARNING, body: "overweight" },
    { value: 26, color: ChartColors.DANGER, body: "obese" },
    { value: 28, color: ChartColors.DANGER, body: "obese" }
  ]
};

export const StorageKeys = {
  BFP_METHOD: "bfp-method",
  INPUTS: "inputs",
  EXPAND_BFP: "expand-bfp",
  EXPAND_BMI: "expand-bmi"
};

export default {
  ChartColors,
  IN_TO_CM,
  LBS_TO_KG,
  FatPercentageRanges,
  StorageKeys
};
