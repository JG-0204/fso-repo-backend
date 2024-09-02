import { Gender, NewPatientEntry } from './types';

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Missing or incorrect data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseInput(object.name),
      dateOfBirth: parseInput(object.dateOfBirth),
      ssn: parseInput(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseInput(object.occupation),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing.');
};

const parseInput = (input: unknown): string => {
  if (!isString(input)) {
    throw new Error(input + ' is not a string');
  }

  return input;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('incorrect or missing gender');
  }

  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export default toNewPatientEntry;
