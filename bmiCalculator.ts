console.log("BMI Calculator");

export interface BMIValues {
	height: number;
	weight: number;
}

export const parseArguments = (args: Array<string>): BMIValues => {
	if (args.length < 4) throw new Error("Not enough arguments");
	if (args.length > 4) throw new Error("Too many arguments");

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3]),
		};
	} else {
		throw new Error("Provided values were not numbers!");
	}
};

export const calculateBMI = (height: number, weight: number): string => {
	height = height / 100;
	const bmi = weight / (height * height);

	switch (true) {
		case bmi < 18.5:
			console.log("Underweight");
			return "Underweight";
		case bmi >= 18.5 && bmi < 24.9:
			console.log("Normal weight");
			return "Normal weight";
		case bmi >= 25 && bmi < 29.9:
			console.log("Overweight");
			return "Overweight";
		case bmi >= 30:
			console.log("Obese");
			return "Obese";
		default:
			console.log("Invalid BMI");
			return "Invalid BMI";
	}
};

// Only run the following code if this module is executed directly
if (require.main === module) {
	try {
		const { height, weight } = parseArguments(process.argv);
		calculateBMI(height, weight);
	} catch (error: unknown) {
		let errorMessage = "Something went wrong: ";
		if (error instanceof Error) {
			errorMessage += error.message;
		}

		console.log(errorMessage);
	}
}
