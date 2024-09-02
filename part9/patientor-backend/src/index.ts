import express from 'express';
import cors from 'cors';
import diagnosesRouter from '../src/routes/diagnoses';
import patientsRouter from '../src/routes/patients';

const app = express();

app.use(cors());

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.get('/api/ping', (_req, res) => {
  res.status(200).send('pong');
});

app.listen(3001, () => console.log('server listening from port 3001'));
