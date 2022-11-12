import { NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, Patient } from "../types";
import { v4 as uuidv4 } from 'uuid';
import patientService from "./patientService";

const addHospitalEntry = ( id: string, entry: NewHospitalEntry ): Patient => {
    
    const patientToAddEntry = patientService.getPatient(id);
    console.log(entry);

    const newHospitalEntry = {
      id: uuidv4(),
      ...entry
    };

    if (!patientToAddEntry) {
        throw new Error('Could not find the patient');
    }

    patientToAddEntry.entries.push(newHospitalEntry);
    
    console.log(patientToAddEntry);

    return patientToAddEntry;
  };

  const addHealthCheckEntry = ( id: string, entry: NewHealthCheckEntry ): Patient => {
    
    const patientToAddEntry = patientService.getPatient(id);
    console.log(entry);

    const newHealthCheckEntry = {
      id: uuidv4(),
      ...entry
    };

    if (!patientToAddEntry) {
        throw new Error('Could not find the patient');
    }

    patientToAddEntry.entries.push(newHealthCheckEntry);
    
    console.log(patientToAddEntry);
    const patientWithAddedEntry = patientToAddEntry;

    return patientWithAddedEntry;
  };

  const addOccupationalHealthcareEntry = ( id: string, entry: NewOccupationalHealthcareEntry ): Patient => {
    
    const patientToAddEntry = patientService.getPatient(id);
    console.log(entry);

    const newHealthCheckEntry = {
      id: uuidv4(),
      ...entry
    };

    if (!patientToAddEntry) {
        throw new Error('Could not find the patient');
    }
    patientToAddEntry.entries.push(newHealthCheckEntry);
    
    console.log(patientToAddEntry);
    const patientWithAddedEntry = patientToAddEntry;

    return patientWithAddedEntry;
  };

export default { 
    addHospitalEntry, 
    addHealthCheckEntry,
    addOccupationalHealthcareEntry
  };