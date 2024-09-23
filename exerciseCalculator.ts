interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercise = (
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

const dailyExerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
const target = 2;

try {
	const result = calculateExercise(dailyExerciseHours, target);
	console.log(result);
} catch (error: unknown) {
	let errorMessage = "Something went wrong: ";
	if (error instanceof Error) {
		errorMessage += error.message;
	}

	console.log(errorMessage);
}
