import { Router } from 'express';
import patientService from '../services/patientService';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).send(patientService.getPatients());
});

export default router;
