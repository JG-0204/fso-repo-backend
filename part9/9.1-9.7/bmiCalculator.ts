const calculateBmi = (height: number, weight: number) => {
  const heightSquared = height * height;
  const bmi = (weight / heightSquared) * 10000;

  const underWeight = bmi <= 18.4;
  const normal = bmi >= 18.5 && bmi <= 24.9;
  const overWeight = bmi >= 25.0 && bmi <= 29.9;

  if (underWeight) return `${bmi.toFixed(1)} is in the Underweight Range`;
  if (normal) return `${bmi.toFixed(1)} is in the Normal Range`;
  if (overWeight) return `${bmi.toFixed(1)} is in the Overweight Range`;

  return `${bmi.toFixed(1)} is in the Obese Range`;
};

console.log(calculateBmi(180, 60));
