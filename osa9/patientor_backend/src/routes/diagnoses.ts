import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('fetching all diagnoses');
  res.send(diagnoseService.getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;