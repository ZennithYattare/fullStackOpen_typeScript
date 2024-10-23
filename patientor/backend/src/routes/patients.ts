import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";

import patientService from "../services/patientService";
import {
	NonSensitivePatient,
	NewPatientEntry,
	PatientEntry,
	EntryWithoutId,
} from "../types";
import { NewPatientEntrySchema, toNewEntry } from "../utils";

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

router.post(
	"/:id/entries",
	(req: Request<{ id: string }, unknown, EntryWithoutId>, res) => {
		const patient = patientService.findById(req.params.id);
		if (patient) {
			const newEntry = toNewEntry(req.body); // Validate the entry data
			const addedEntry = patientService.addEntry(newEntry, patient);
			res.json(addedEntry);
		} else {
			res.status(404).send({ error: "Patient not found" });
		}
	}
);

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		NewPatientEntrySchema.parse(req.body);
		console.log(req.body);
		next();
	} catch (error: unknown) {
		next(error);
	}
};

const errorMiddleware = (
	error: unknown,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof z.ZodError) {
		res.status(400).send({ error: error.issues });
	} else {
		next(error);
	}
};

router.post(
	"/",
	newPatientParser,
	(
		req: Request<unknown, unknown, NewPatientEntry>,
		res: Response<PatientEntry>
	) => {
		const addedEntry = patientService.addPatient(req.body);
		res.json(addedEntry);
	}
);

router.use(errorMiddleware);

export default router;
