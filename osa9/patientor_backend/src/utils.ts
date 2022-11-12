import { Patient, Gender, Entry, Discharge, NewHospitalEntry, 
  NewHealthCheckEntry, HealthCheckRating, NewOccupationalHealthcareEntry,
  SickLeave } from './types';


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const isDate = (date: string): boolean => {
  console.log("date", Date.parse(date));
    return Boolean(Date.parse(date));
  };

const isObject = (param: unknown): boolean => {
  if (typeof param !== 'object' || param === null || Array.isArray(param)) {
    return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
  };

const isEntries = (param: unknown): param is Array<Entry> => {
  console.log("isEntries käytössä");
  if (!Array.isArray(param)) {
    return false;
  }
  return param.every(entry => entry.type === "HospitalEntry" || entry.type === "OccupationalHealthcareEntry" || entry.type === "HealthCheckEntry");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  if (!isObject(param)){
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!Object.keys(param).includes("date") || !Object.keys(param).includes("criteria")) {
    return false;
  }
  if (!isString(param.date) || !isString(param.criteria) ) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if ( !isDate(param.date) ) {
    return false;
  }
  return true;
};

const isDiagnosisCodes = (param: unknown): param is Array<string> => {
  if (!Array.isArray(param)) {
    return false;
  }
  return param.every(diagnose => typeof diagnose === 'string');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  console.log('healthcheck', HealthCheckRating);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  console.log("isSickleave käytössä");
  if (!isObject(param)) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!Object.keys(param).includes("startDate") || !Object.keys(param).includes("endDate")) {
    return false;
  }
  if (!isString(param.startDate) || !isString(param.endDate)) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!isDate(param.startDate) || !isDate(param.endDate)) {
    return false;
  }
  return true;
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

const parseHospitalType = (type: unknown): "Hospital" => {
  if (type !== "Hospital") {
    throw new Error('Incorrect or missing Type');
  }
  return type;
};

const parseHealthCheckType = (type: unknown): "HealthCheck" => {
  if (type !== "HealthCheck") {
    throw new Error('Incorrect or missing Type');
  }
  return type;
};

const parseOccupationalHealthcareType = (type: unknown): "OccupationalHealthcare" => {
  if (type !== "OccupationalHealthcare") {
    throw new Error('Incorrect or missing Type');
  }
  return type;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect of missing date");
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("incorrect or missing specialist");
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<string> => {
  if (!diagnosisCodes) {
    return [];
  }
  if (!isDiagnosisCodes(diagnosisCodes)) {
    throw new Error("incorrect or missing diagnosis codes");
  }
  return diagnosisCodes;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("incorrect or missing description");
  }
  return description;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error("incorrect or missing discharge");
  } 
  return discharge;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error("incorrect or missing rating");
  }
  return rating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("incorrect or missing employer name");
  }
  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error("incorrect or missing sick leave");
  }
  return sickLeave;
};

const parseEntries = (entries: unknown): Array<Entry> => {
  if (!entries) {
    return [];
  }
  if (!isEntries(entries)){
    throw new Error("incorrect or missing Entries");
  }
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

type HospitalEntryFields = { type: unknown, date:unknown, specialist: unknown,
  diagnosisCodes?: Array<unknown>, description: unknown, discharge: unknown,};

const toNewHospitalEntry = ({ type, date, specialist, diagnosisCodes, description, discharge} : HospitalEntryFields): NewHospitalEntry => {
  const newHospitalEntry: NewHospitalEntry = {
    type: parseHospitalType(type),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    description: parseDescription(description),
    discharge: parseDischarge(discharge)
  };
  return newHospitalEntry;
};

type HealthCheckEntryFields = { type: unknown, date:unknown, specialist: unknown,
  diagnosisCodes?: Array<unknown>, description: unknown,
  healthCheckRating: unknown};


const toNewHealthCheckEntry = ({ type, date, specialist, diagnosisCodes, description, healthCheckRating} : HealthCheckEntryFields): NewHealthCheckEntry => {
  const newHealthCheckEntry: NewHealthCheckEntry = {
    type: parseHealthCheckType(type),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    description: parseDescription(description),
    healthCheckRating: parseHealthCheckRating(healthCheckRating)
  };
  return newHealthCheckEntry;
};

type OccupationalHealthcareEntryFields = { type: unknown, date:unknown, specialist: unknown,
  diagnosisCodes?: unknown, description: unknown, employerName: unknown,
  sickLeave?: unknown };

const toNewOccupationalHealthcareEntry = ({ type, date, specialist, diagnosisCodes, description, employerName, sickLeave } : OccupationalHealthcareEntryFields): NewOccupationalHealthcareEntry => {
  const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
    type: parseOccupationalHealthcareType(type),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    description: parseDescription(description),
    employerName: parseEmployerName(employerName),
    sickLeave: parseSickLeave(sickLeave)
  };
  return newOccupationalHealthcareEntry;
};

export default { toNewPatientEntry, toNewHospitalEntry, toNewHealthCheckEntry, toNewOccupationalHealthcareEntry };