import express, { Response } from "express";

import diagnosesService from "../services/diagnosisService";
import { DiagnosisEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<DiagnosisEntry[]>) => {
  res.send(diagnosesService.getEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnosis!");
});

export default router;