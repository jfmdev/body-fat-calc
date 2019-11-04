// Calculates the Body Mass Index.
export function BMI(weightInKg, heightInCm) {
  if (!weightInKg || weightInKg <= 0 || !heightInCm || heightInCm <= 0) {
    return null;
  }

  const heightInM = heightInCm / 100;
  return weightInKg / (heightInM * heightInM);
}

// Estimates the fat percentage using the Deurenberg method.
export function deurenberg(weightInKg, heightInCm, isFemale, age) {
  const bmi = BMI(weightInKg, heightInCm);
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

// TODO: Estimates the fat percentage using the US Navy method.
export function usNavy() {
  return null;
}

export default {
  BMI,
  deurenberg,
  RFM,
  usNavy
};
