
interface ExerciseValues {
  target: number;
  trainingHours: Array<number>;
}

const argumentsParser = (args: Array<string>): ExerciseValues => {
  console.log('argumeetsissa ollaan', args);

  if (args.length < 4) throw new Error('Not enough arguments');

  const hoursArray = args.slice(3).map(n => Number(n));

  const hoursAreNotNumbers = hoursArray.some(isNaN);

  console.log('hoursAreNotNumbers', hoursAreNotNumbers);

  if (!isNaN(Number(args[2])) && !hoursAreNotNumbers) {
    return {
      target: Number(args[2]),
      trainingHours: hoursArray
    };
  } else {
    throw new Error('All of the provided values must be numbers!');
  }
};

const getRating = (average: number, target: number): number => {
  if (average < target /2)  {
    return 1;
  }
  if (average >= target) {
      return 3;
  }
  return 2;
};

const getDescription = (rating: number): string => {
  if (rating === 1) return 'You are more than half behind your target';
  if (rating === 2) return 'Getting close, but not quite there yet';
  return 'Congratulations, you have reached your goal!';
  };

interface TrainingValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number
  average: number
}

export const calculateExercises = (trainingHours: Array<number>, target: number) => {
  const periodLenght = trainingHours.length;
  const trainingDays = trainingHours.filter(dailyHours => dailyHours > 0).length;
  const trainigHoursSum = trainingHours.reduce((sum, hours) => sum + hours, 0);
  const average = trainigHoursSum / periodLenght;
  const success = average > target;
  const rating = getRating(average, target);
  const ratingDescription = getDescription(rating);

  const trainingResult: TrainingValues = {
    periodLength: periodLenght,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
  
  return trainingResult;
};

try {
  const { target, trainingHours } = argumentsParser(process.argv);
  console.log(calculateExercises(trainingHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
