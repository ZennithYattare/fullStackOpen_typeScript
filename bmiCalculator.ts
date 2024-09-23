console.log("BMI Calculator");

interface BMIValues {
	height: number;
	weight: number;
}

const parseArguments = (args: Array<string>): BMIValues => {
	// Check if there are fewer than 4 arguments
	// process.argv includes:
	// 0: path to the node executable
	// 1: path to the script file
	// 2: height argument
	// 3: weight argument
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

const calculateBMI = (height: number, weight: number) => {
	height = height / 100;
	return weight / (height * height);
};

try {
	const { height, weight } = parseArguments(process.argv);
	const bmi = calculateBMI(height, weight);

	switch (true) {
		case bmi < 18.5:
			console.log("Underweight");
			break;
		case bmi >= 18.5 && bmi < 24.9:
			console.log("Normal weight");
			break;
		case bmi >= 25 && bmi < 29.9:
			console.log("Overweight");
			break;
		case bmi >= 30:
			console.log("Obese");
			break;
		default:
			console.log("Invalid BMI");
	}
} catch (error: unknown) {
	let errorMessage = "Something went wrong: ";
	if (error instanceof Error) {
		errorMessage += error.message;
	}

	console.log(errorMessage);
}
