
import express from 'express';
import patientService from '../services/patientService';
import { Patient } from '../types';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  console.log('haetaan potilaan tiedot');
  const id = req.params.id;
  res.send(patientService.getPatient(id));
});

router.post('/', (req, res) => {
  const body = req.body as Omit<Patient, 'id'>;
  try {
  const newPatientVerified = toNewPatientEntry(body);

  const newPatient = patientService.addPatients(newPatientVerified);
  console.log('new patient ', newPatient);
  res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


export default router;