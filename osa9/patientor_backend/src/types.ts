
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
  }
  
  export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
  
  interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge: {
    date: string,
    criteria: string,
  }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string
  sickLeave?: {
    startDate: string,
    endDate: string,
  }
}

export interface Discharge {
  date: string,
  criteria: string
}

export interface SickLeave {
  startDate: string,
  endDate: string,
}

export interface NewHospitalEntry {
  type: "Hospital"
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<string>;
  discharge: Discharge
}

export interface NewHealthCheckEntry {
  type: "HealthCheck";
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<string>;
  healthCheckRating: HealthCheckRating;
}

export interface NewOccupationalHealthcareEntry {
  type: "OccupationalHealthcare";
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<string>;
  employerName: string
  sickLeave?: SickLeave
}



// // Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// // Define Entry without the 'id' property

// type EntryWithoutId = UnionOmit<Entry, 'id'>;