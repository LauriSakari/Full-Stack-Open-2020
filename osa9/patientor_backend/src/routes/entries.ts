import express from 'express';
import { NewHospitalEntry, NewHealthCheckEntry, NewOccupationalHealthcareEntry } from '../types';
import utils from '../utils';
import entryService from '../services/entryService';

const router = express.Router();



router.post('/:id/entries', (req, res) => {
    console.log('posting an entry', req.body);
    const id = req.params.id;
    try {
    switch (req.body.type) {
      case "Hospital": {
        const body = req.body as NewHospitalEntry;
          const newHospitalEntryVerified = utils.toNewHospitalEntry(body);
          const newHospitalEntry = entryService.addHospitalEntry(id, newHospitalEntryVerified);
            res.send('tiedot tallennettu' + JSON.stringify(newHospitalEntry));
      }
      break;
      case "HealthCheck": {
        const body = req.body as NewHealthCheckEntry;
        const newHealthCheckEntryVerified = utils.toNewHealthCheckEntry(body);
        const newHealthCheckEntry = entryService.addHealthCheckEntry(id, newHealthCheckEntryVerified);
        res.send(newHealthCheckEntry);
      }
      break;
      case "OccupationalHealthcare": {
        const body = req.body as NewOccupationalHealthcareEntry;
        const newOccupationalHealthcareEntryVerified = utils.toNewOccupationalHealthcareEntry(body);
        const newOccupationalHealthcareEntry = entryService.addOccupationalHealthcareEntry(id, newOccupationalHealthcareEntryVerified);
        res.send(newOccupationalHealthcareEntry);
      }
      break;
    default:
      res.status(400).send("Something went wrong. Can't find the type");
     break;
    }
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
    
    


});

export default router;