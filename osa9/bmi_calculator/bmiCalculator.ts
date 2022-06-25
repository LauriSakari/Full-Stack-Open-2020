
interface HeightWeightValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): HeightWeightValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number) => {
  const bmi = parseFloat((weight / (height / 100 * 2)).toFixed(2));

  console.log('bmi', bmi);

  if (bmi < 18.5) {
    return `bmi ${bmi} under weight`;
  }    
  else if (bmi > 18.5 && bmi < 24.9) {
    return `bmi ${bmi} normal weight`;
  }
  else if (bmi > 25 && bmi < 29.9) {
    return `bmi ${bmi} over weight`;
  }
  else (bmi > 29.9); {
    return `bmi ${bmi} obese`;
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
