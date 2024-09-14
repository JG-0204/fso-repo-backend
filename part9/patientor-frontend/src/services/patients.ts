import axios from 'axios';
import { NewEntry, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getPatient = async (patientId: string) => {
  const patientUrl = `${apiBaseUrl}/patients/${patientId}`;

  const { data } = await axios.get<Patient>(patientUrl);

  return data;
};

const addPatientEntry = async (patientId: string, entry: NewEntry) => {
  const url = `${apiBaseUrl}/patients/${patientId}/entries`;

  try {
    const { data } = await axios.post<NewEntry>(url, entry);
    return data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const errorObject = e.response?.data.Error[0];
      const errorMessage = `Incorrect ${errorObject.path[0]}: ${errorObject.received}.`;
      throw new Error(errorMessage);
    }
  }
};

export default {
  getAll,
  create,
  getPatient,
  addPatientEntry,
};
