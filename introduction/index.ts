import express from "express";
const app = express();

import { BMIValues, calculateBMI } from "./bmiCalculator";
import { ExerciseRequestBody, calculateExercise } from "./exerciseCalculator";

app.use(express.json());

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
	const { height, weight } = req.query as unknown as BMIValues;

	if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
		return res.status(400).json({ error: "malformatted parameters" });
	}

	const bmi = calculateBMI(height, weight);

	return res.json({
		weight,
		height,
		bmi,
	});
});

app.post("/exercises", (req, res) => {
	const { daily_exercises, target } = req.body as ExerciseRequestBody;

	if (!daily_exercises || !target) {
		return res.status(400).json({ error: "parameters missing" });
	}

	if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
		return res.status(400).json({ error: "malformatted parameters" });
	}

	const exerciseHours = calculateExercise(daily_exercises, target);

	return res.json({
		periodLength: exerciseHours.periodLength,
		trainingDays: exerciseHours.trainingDays,
		success: exerciseHours.success,
		rating: exerciseHours.rating,
		ratingDescription: exerciseHours.ratingDescription,
		target: exerciseHours.target,
		average: exerciseHours.average,
	});
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
