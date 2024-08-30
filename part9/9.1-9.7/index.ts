import express from 'express';
import { isNotANumber } from './util';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res.status(400).send({
      error: 'malformatted parameters',
    });
  }

  if (isNotANumber(req.query.height) || isNotANumber(req.query.weight)) {
    return res.status(400).send({
      error: 'malformatted parameters',
    });
  }

  const { height, weight } = req.query;

  const result = {
    height: Number(height),
    weight: Number(weight),
    bmi: calculateBmi(Number(height), Number(weight)),
  };

  return res.status(200).send(result);
});

app.post('/exercises', (req, res) => {
  // console.log(req.body);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body.targetHour || !req.body.dailyHours) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { targetHour, dailyHours } = req.body;

  const isSomeNotANumber = () =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    dailyHours.some((value: any) => isNotANumber(value));

  if (isNotANumber(targetHour) || isSomeNotANumber()) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call
  const parsedDailyHours = dailyHours.map((hour: any) => Number(hour));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercise(parsedDailyHours, Number(targetHour));

  return res.status(200).send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});
