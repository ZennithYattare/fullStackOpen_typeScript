import express, { Response } from "express";

import patientService from "../services/patientService";
import { NonSensitivePatient } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
	res.send(patientService.getNonSensitiveEntries());
});

router.post("/", (_req, res) => {
	res.send("Saving a patient!");
});

export default router;
