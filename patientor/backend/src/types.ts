import { z } from "zod";

import { NewPatientEntrySchema } from "./utils";

// NOTE: Diagnosis
export interface DiagnosisEntry {
	code: string;
	name: string;
	latin?: string;
}

// NOTE: Patient
export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other",
}

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;

export interface PatientEntry extends NewPatientEntry {
	id: string;
};

export type NonSensitivePatient = Omit<PatientEntry, "ssn">;