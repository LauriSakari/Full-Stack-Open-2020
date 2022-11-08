import { Patient, Gender, Entry } from './types';


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntries = (param: Array<any>): param is Array<Entry> => {
  return Array.isArray(param);
};

const parsename = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
  };

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth');
      }
      return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
    return ssn;
  };

  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender');
    }
    return gender;
  };

  const parseOccupation = (occupation: unknown): string => {
        if (!occupation || !isString(occupation)) {
          throw new Error('Incorrect or missing occupation');
        }
        return occupation;
      };

const parseEntries = (entries: Array<unknown>): Array<Entry> => {
  if (!entries) {
    return [];
  }
  console.log(entries);
  if (!isEntries(entries)){
    throw new Error("incorrect or missing Entries");
  }
  console.log(entries);
  return entries;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: Array<unknown> };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries } : Fields): Omit<Patient, 'id' > => {
  const newPatient: Omit<Patient, 'id'> = {
    name: parsename(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries)
  };

  return newPatient;
};

export default toNewPatientEntry;