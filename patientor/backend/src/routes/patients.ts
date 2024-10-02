/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Response } from "express";

import patientService from "../services/patientService";
import { NonSensitivePatient } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
	res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
	const patient = patientService.findById(req.params.id);
	if (patient) {
		res.send(patient);
	} else {
		res.sendStatus(404);
	}
});

router.post("/", (_req, res) => {
	const { name, dateOfBirth, ssn, gender, occupation } = _req.body;

	const newPatient = patientService.addPatient({
		name,
		dateOfBirth,
		ssn,
		gender,
		occupation,
	});

	res.json(newPatient);
});

export default router;
