// Calculates the Body Mass Index.
export function BMI(heightInCm, weightInKg) {
  if (!weightInKg || weightInKg <= 0 || !heightInCm || heightInCm <= 0) {
    return null;
  }

  const heightInM = heightInCm / 100;
  return weightInKg / (heightInM * heightInM);
}

// Estimates the fat percentage using the Deurenberg method.
export function deurenberg(isFemale, heightInCm, weightInKg, age) {
  const bmi = BMI(heightInCm, weightInKg);
  if (!bmi || !age || age < 0) {
    return null;
  }

  const isChild = age < 18;
  const a = isChild ? 1.51 : 1.2;
  const b = isChild ? 0.7 : 0.23;
  const c = isChild ? (isFemale ? 1.4 : -2.2) : isFemale ? -5.4 : -16.2;

  return a * bmi + b * age + c;
}

// Estimates the Relative Fat Mass index.
export function RFM(isFemale, heightInCm, waistInCm) {
  if (!heightInCm || heightInCm <= 0 || !waistInCm || waistInCm <= 0) {
    return null;
  }

  const constant = isFemale ? 76 : 64;
  return constant - 20 * (heightInCm / waistInCm);
}

// Estimates the fat percentage using the US Navy method.
export function usNavy(isFemale, heightInCm, waistInCm, neckInCm, hipInCm) {
  if (
    !heightInCm ||
    heightInCm <= 0 ||
    !waistInCm ||
    waistInCm <= 0 ||
    !neckInCm ||
    neckInCm <= 0 ||
    (isFemale && (!hipInCm || hipInCm <= 0))
  ) {
    return null;
  }

  const abc = isFemale
    ? [1.29579, -0.35004, 0.221]
    : [1.0324, -0.19077, 0.15456];
  const x1 = isFemale ? waistInCm + hipInCm - neckInCm : waistInCm - neckInCm;
  const x2 = heightInCm;

  return (
    495 / (abc[0] + abc[1] * Math.log10(x1) + abc[2] * Math.log10(x2)) - 450
  );
}

export default {
  BMI,
  deurenberg,
  RFM,
  usNavy
};
