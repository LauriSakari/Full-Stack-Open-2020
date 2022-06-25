import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    if (isNaN(Number(_req.query.height)) || isNaN(Number(_req.query.weight))
      || !_req.query.height || !_req.query.weight) {
        console.log('ei onnistu');
        return res.status(400).json({ error: "malformatted parameters"});
    }
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);
    const bmi = calculateBmi(Number(_req.query.height), Number(_req.query.weight));
      return res.status(200).json({ height, weight, bmi });
  });

  app.post('/exercises', (req, res) => {

    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!req.body.daily_exercises || !req.body.target) {
      return res.status(400).json({ error: "parameters missing" });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    if (req.body.daily_exercises.some(isNaN) || isNaN(Number(req.body.target)) ) {
      return res.status(400).json({ error: "malformatted parameters" });
    }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
    const { daily_exercises, target } = req.body;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = calculateExercises(daily_exercises, target);

    return res.status(200).json({ response });
  });

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});