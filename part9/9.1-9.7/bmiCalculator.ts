import { getError, isNotANumber } from './util';

interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (argv: string[]): BmiValues => {
  if (argv.length > 4) throw new Error('too many arguments');
  if (argv.length < 4) throw new Error('not enough arguments');

  if (!isNotANumber(argv[2]) && !isNotANumber(argv[3])) {
    return {
      height: Number(argv[2]),
      weight: Number(argv[3]),
    };
  }
  throw new Error('one or more values is not a number.');
};

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

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e: unknown) {
  const errorMessage = getError(e);
  console.log(errorMessage);
}
