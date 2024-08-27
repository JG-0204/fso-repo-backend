interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercise = (hoursArr: number[], target: number): Result => {
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

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 1));
