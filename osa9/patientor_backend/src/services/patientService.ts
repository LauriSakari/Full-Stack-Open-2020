
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
  console.log(id);
  const patientToReturn = patientData.find(patient => patient.id === id);
  console.log(patientToReturn);
  return patientToReturn;
};

const addPatients = (patient: Omit<Patient, 'id'>) => {
  console.log('addpatients', patient);
  const newPatient = {
    id: uuidv4(),
    ...patient
  };
  console.log(patientData);

  patientData.push(newPatient);
  console.log('afterpush', patientData);
  return newPatient;
};

export default {
  getPatients,
  getPatient,
  addPatients
};