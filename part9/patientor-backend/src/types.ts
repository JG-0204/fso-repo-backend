import { z } from 'zod';
import { NewEntrySchema } from './utils';

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient extends NewPatientEntry {
  id: string;
}

export type PatientWithoutSsn = Omit<Patient, 'ssn'>;

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;
