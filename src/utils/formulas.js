// Calculates the Body Mass Index.
export function bmi(weightInKg, heightInCm) {
  if (!weightInKg || weightInKg <= 0 || !heightInCm || heightInCm <= 0) {
    return null;
  }

  const heightInM = heightInCm / 100;
  return weightInKg / (heightInM * heightInM);
}

export function deurenberg() {
  return null;
}

// Calculates the Relative Fat Mass index.
export function rfm(isFemale, heightInCm, waistInCm) {
  const constant = isFemale ? 76 : 64;
  return constant - 20 * (heightInCm / waistInCm);
}

export function usNavy() {
  return null;
}

export default {
  bmi,
  deurenberg,
  rfm,
  usNavy
};
