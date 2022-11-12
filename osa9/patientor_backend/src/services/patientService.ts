
import patientData from '../../data/patients';

import { Patient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Omit<Patient, 'ssn' | 'entries'>[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string) => {
  const patientToReturn = patientData.find(patient => patient.id === id);
  return patientToReturn;
};

const addPatients = (patient: Omit<Patient, 'id'>) => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatient,
  addPatients
};