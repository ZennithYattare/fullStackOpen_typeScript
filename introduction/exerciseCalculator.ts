export interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

export interface ExerciseRequestBody {
	daily_exercises: number[];
	target: number;
}

export const parseExerciseArguments = (args: Array<string>): number[] => {
	// Ensure there are at least 4 arguments: node path, script path, target, and at least one daily exercise hourS
	if (args.length < 4) throw new Error("Not enough arguments");

	const target = Number(args[2]);
	const dailyExerciseHours = args.slice(3).map((hours) => Number(hours));

	if (isNaN(target) || dailyExerciseHours.some((hours) => isNaN(hours))) {
		throw new Error("Provided values were not numbers!");
	}

	return [target, ...dailyExerciseHours];
};

export const calculateExercise = (
	dailyExerciseHours: number[],
	target: number
): Result => {
	const average =
		dailyExerciseHours.reduce((a, b) => a + b, 0) / dailyExerciseHours.length;

	let rating: number;

	if (average >= target) {
		rating = 3;
	} else if (average >= target - 1) {
		rating = 2;
	} else {
		rating = 1;
	}

	let ratingDescription: string;

	switch (rating) {
		case 3:
			ratingDescription = "Very good!";
			break;
		case 2:
			ratingDescription = "Not too bad but could be better";
			break;
		case 1:
			ratingDescription = "I'm sorry...";
			break;
		default:
			ratingDescription = "Help me!";
	}

	return {
		periodLength: dailyExerciseHours.length,
		trainingDays: dailyExerciseHours.filter((hours) => hours > 0).length,
		success: average >= target,
		rating,
		ratingDescription,
		target,
		average,
	};
};

if (require.main === module) {
	try {
		const [target, ...dailyExerciseHours] = parseExerciseArguments(
			process.argv
		);

		const result = calculateExercise(dailyExerciseHours, target);

		console.log(result);
	} catch (error: unknown) {
		let errorMessage = "Something went wrong: ";
		if (error instanceof Error) {
			errorMessage += error.message;
		}

		console.log(errorMessage);
	}
}
