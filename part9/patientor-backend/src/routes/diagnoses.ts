import { Router } from 'express';
import diagnosisService from '../services/diagnosisService';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).send(diagnosisService.getDiagnoses());
});

export default router;
