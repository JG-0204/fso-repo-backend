import { Gender, HealthCheckRating } from './types';
import { z } from 'zod';

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HospitalEntry = z.object({
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

const HealthCheckEntry = z.object({
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const OccupationalHealthcareEntry = z.object({
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

export const HospitalEntrySchema = BaseEntrySchema.merge(HospitalEntry);

export const HealthCheckEntrySchema = BaseEntrySchema.merge(HealthCheckEntry);

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.merge(
  OccupationalHealthcareEntry
);
