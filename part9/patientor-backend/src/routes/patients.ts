import { Request, Response, NextFunction, Router } from 'express';
import { ZodError } from 'zod';

import patientService from '../services/patientService';
import { NewEntrySchema } from '../utils';
import { NewPatientEntry } from '../types';

const router = Router();

const parseBody = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
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
