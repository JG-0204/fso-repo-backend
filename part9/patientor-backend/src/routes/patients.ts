import { Request, Response, NextFunction, Router } from 'express';
import { ZodError } from 'zod';

import patientService from '../services/patientService';
import {
  NewEntrySchema,
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
} from '../utils';
import { NewEntry, NewPatientEntry, Diagnosis } from '../types';

const router = Router();

const parseBody = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const parseBodyByEntryType = (
  req: Request<unknown, unknown, NewEntry>,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.type === 'HealthCheck') {
      HealthCheckEntrySchema.parse(req.body);
      next();
    }
    if (req.body.type === 'Hospital') {
      HospitalEntrySchema.parse(req.body);
      next();
    }
    if (req.body.type === 'OccupationalHealthcare') {
      OccupationalHealthcareEntrySchema.parse(req.body);
      next();
    }
  } catch (error) {
    next(error);
  }
};

router.get('/', (_req, res) => {
  res.status(200).send(patientService.getPatients());
});

router.post(
  '/',
  parseBody,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<NewPatientEntry>
  ) => {
    const newPatientEntry = patientService.addNewPatient(req.body);
    res.json(newPatientEntry);
  }
);

router.get('/:id', (req, res) => {
  const patientId = req.params.id;
  const patient = patientService.getPatient(patientId);

  if (!patient) {
    res.send({
      message: 'Patient not found.',
    });
    return;
  }

  res.send(patient);
});

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

router.post(
  '/:id/entries',
  parseBodyByEntryType,
  (req: Request<{ id: string }, unknown, NewEntry>, res) => {
    const patientId = req.params.id;
    const diagnosisCodes = parseDiagnosisCodes(req);
    const updatedPatient = patientService.addNewPatientEntry(
      { diagnosisCodes, ...req.body },
      patientId
    );
    res.send(updatedPatient);
  }
);

const errorMiddleware = (
  e: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (e instanceof ZodError) {
    res.status(400).send({ Error: e.issues });
  } else {
    next(e);
  }
};

router.use(errorMiddleware);

export default router;
