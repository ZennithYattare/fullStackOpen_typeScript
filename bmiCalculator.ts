console.log("BMI Calculator");

const calculateBMI = (height: number, weight: number): number => {
	height = height / 100;
	return weight / (height * height);
};

const bmi = calculateBMI(180, 74);

try {
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
