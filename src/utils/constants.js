export const AmericanCouncilCategories = {
  FEMALE: [
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
  ],

  MALE: [
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
  ]
};

export const ChartColors = {
  DANGER: "#f00",
  EXCELLENT: "#0c0",
  GOOD: "#0f0",
  WARNING: "#ee0"
};

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

export const JacksonAndPollardPercentages = {
  FEMALE: [
    { age: 20, value: 17.7 },
    { age: 25, value: 18.4 },
    { age: 30, value: 19.3 },
    { age: 35, value: 21.5 },
    { age: 40, value: 22.2 },
    { age: 45, value: 22.9 },
    { age: 50, value: 25.2 },
    { age: 55, value: 26.3 }
  ],

  MALE: [
    { age: 20, value: 8.5 },
    { age: 25, value: 10.5 },
    { age: 30, value: 12.7 },
    { age: 35, value: 13.7 },
    { age: 40, value: 15.3 },
    { age: 45, value: 16.4 },
    { age: 50, value: 18.9 },
    { age: 55, value: 20.9 }
  ]
};

export const StorageKeys = {
  BFP_METHOD: "bfp-method",
  INPUTS: "inputs",
  EXPAND_BFP: "expand-bfp",
  EXPAND_BMI: "expand-bmi",
  EXPAND_STATS: "expand-stats"
};

export const IN_TO_CM = 2.54;
export const LBS_TO_KG = 0.45359237;

export default {
  AmericanCouncilCategories,
  ChartColors,
  FatPercentageRanges,
  JacksonAndPollardPercentages,
  StorageKeys,
  IN_TO_CM,
  LBS_TO_KG
};
