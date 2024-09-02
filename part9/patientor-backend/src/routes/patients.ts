import { Router } from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).send(patientService.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addNewPatient(newPatientEntry);
    res.send(addedEntry);
  } catch (e: unknown) {
    let errorMessage = 'Something went wrong! ';
    if (e instanceof Error) {
      errorMessage += 'Error: ' + e.message;
    }
    res.status(404).send(errorMessage);
  }
});

export default router;
