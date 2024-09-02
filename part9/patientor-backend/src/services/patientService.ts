import { v1 as uuid } from 'uuid';

import { NewPatientEntry, Patient, PatientWithoutSsn } from '../types';
import patients from '../../data/patients';

const getPatients = (): PatientWithoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addNewPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addNewPatient,
};
