import express from 'express';
import { isNotANumber } from './util';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.use('/hello', (_req, res) => {
  res.send('Hello Fullstack');
});

app.use('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.status(400).send({
      error: 'malformatted parameters',
    });
    return;
  }

  if (isNotANumber(req.query.height) || isNotANumber(req.query.weight)) {
    res.status(400).send({
      error: 'malformatted parameters',
    });
    return;
  }

  const { height, weight } = req.query;

  const result = {
    height: Number(height),
    weight: Number(weight),
    bmi: calculateBmi(Number(height), Number(weight)),
  };

  res.status(200).send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});
