import express from "express";
const app = express();

import { calculateBMI } from "./bmiCalculator";

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

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

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
