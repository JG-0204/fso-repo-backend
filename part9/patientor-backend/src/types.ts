import { z } from 'zod';
import {
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  NewEntrySchema,
} from './utils';

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

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

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type PatientWithoutSsn = Omit<Patient, 'ssn' | 'entries'>;

export interface NewPatientEntry extends z.infer<typeof NewEntrySchema> {
  entries: Entry[];
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface HealthCheckEntry extends z.infer<typeof HealthCheckEntrySchema> {
  id: string;
  type: 'HealthCheck';
}

interface HospitalEntry extends z.infer<typeof HospitalEntrySchema> {
  id: string;
  type: 'Hospital';
}

interface OccupationalHealthcareEntry
  extends z.infer<typeof OccupationalHealthcareEntrySchema> {
  id: string;
  type: 'OccupationalHealthcare';
}

export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry;

export type NewEntry = UnionOmit<Entry, 'id'>;
