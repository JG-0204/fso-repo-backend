import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.status(200).send('pong');
});

app.listen(3001, () => console.log('server listening from port 3001'));
