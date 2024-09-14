import { v1 as uuid } from 'uuid';

import {
  Entry,
  NewEntry,
  NewPatientEntry,
  Patient,
  PatientWithoutSsn,
} from '../types';
import patients from '../../data/patients';

const getPatients = (): PatientWithoutSsn[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addNewPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const addNewPatientEntry = (patientEntry: NewEntry, id: string): Entry => {
  const newPatientEntry = {
    id: uuid(),
    ...patientEntry,
  };

  const patient = patients.find((p) => p.id === id);
  patient?.entries.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addNewPatient,
  getPatient,
  addNewPatientEntry,
};
