import diagnosis from '../../data/diagnoses';

import { Diagnosis } from '../types';

const getDiagnoses = ():Array<Diagnosis> => {
  return diagnosis;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};