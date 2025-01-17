import { z } from "zod";

import { NewPatientEntrySchema, EntrySchema } from "./utils";

// NOTE: Diagnosis
export interface DiagnosisEntry {
	code: string;
	name: string;
	latin?: string;
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3,
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
}

export type NonSensitivePatient = Omit<PatientEntry, "ssn" | "entries">;

// NOTE: Entry
export type Entry = z.infer<typeof EntrySchema>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;