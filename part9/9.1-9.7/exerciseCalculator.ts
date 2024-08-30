import { getError, isNotANumber } from './util';
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface ExerciseValues {
  hoursPerDay: number[];
  targetHour: number;
}

const parseArguments = (argv: string[]): ExerciseValues => {
  if (argv.length <= 3) throw new Error('not enough arguments');
  if (isNotANumber(argv[2])) throw new Error('targetHour is not a number');

  const targetHour: number = Number(argv[2]);
  const hoursPerDay: number[] = [];

  for (let index = 3; index < argv.length; index++) {
    if (!isNotANumber(argv[index])) {
      hoursPerDay.push(Number(argv[index]));
    } else {
      throw new Error('one or more values is not a number');
    }
  }

  return {
    targetHour,
    hoursPerDay,
  };
};

export const calculateExercise = (
  hoursArr: number[],
  target: number
): Result => {
  const exerciseDays = hoursArr.filter((hour) => hour > 0);
  const exerciseHours = exerciseDays.reduce((a, b) => a + b);
  const average = exerciseDays.reduce((a, b) => a + b) / hoursArr.length;

  const expectedHours = target * hoursArr.length;

  const getRating = () => {
    const hourDifference = expectedHours - exerciseHours;

    if (hourDifference <= 0)
      return {
        rating: 3,
        ratingDescription: "Well done! You've met your goal.",
      };
    if (hourDifference >= 0.5 && hourDifference <= 1)
      return {
        rating: 2,
        ratingDescription:
          "Good Job! You've just missed half an hour/hour, You're getting close",
      };
    return {
      rating: 1,
      ratingDescription:
        "Uh-oh, You've missed your goal. Consider setting attainable target. Let's try an hour a day.",
    };
  };

  const { rating, ratingDescription } = getRating();

  const result = {
    periodLength: hoursArr.length,
    trainingDays: exerciseDays.length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };

  return result;
};

if (require.main === module) {
  try {
    const { hoursPerDay, targetHour } = parseArguments(process.argv);
    console.log(calculateExercise(hoursPerDay, targetHour));
  } catch (e: unknown) {
    const errorMessage = getError(e);
    console.log(errorMessage);
  }
}
