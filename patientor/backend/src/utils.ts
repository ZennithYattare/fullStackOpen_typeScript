import { z } from "zod";

import {
	NewPatientEntry,
	Gender,
	HealthCheckRating,
	EntryWithoutId,
	DiagnosisEntry,
} from "./types";

// NOTE: Base entry schema
const BaseEntrySchema = z.object({
	id: z.string(),
	description: z.string(),
	date: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Invalid date format",
	}),
	specialist: z.string(),
	diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckRatingSchema = z.nativeEnum(HealthCheckRating);

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
	type: z.literal("HealthCheck"),
	healthCheckRating: HealthCheckRatingSchema,
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
	type: z.literal("Hospital"),
	discharge: z.object({
		date: z.string().refine((date) => !isNaN(Date.parse(date)), {
			message: "Invalid date format",
		}),
		criteria: z.string(),
	}),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
	type: z.literal("OccupationalHealthcare"),
	employerName: z.string(),
	sickLeave: z
		.object({
			startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
				message: "Invalid date format",
			}),
			endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
				message: "Invalid date format",
			}),
		})
		.optional(),
});

export const EntrySchema = z.union([
	HealthCheckEntrySchema,
	HospitalEntrySchema,
	OccupationalHealthcareEntrySchema,
]);

// Create schemas that omit the `id` field
const HealthCheckEntryWithoutIdSchema = HealthCheckEntrySchema.omit({
	id: true,
});
const HospitalEntryWithoutIdSchema = HospitalEntrySchema.omit({ id: true });
const OccupationalHealthcareEntryWithoutIdSchema =
	OccupationalHealthcareEntrySchema.omit({ id: true });

// Create a union of the schemas without `id`
export const EntryWithoutIdSchema = z.union([
	HealthCheckEntryWithoutIdSchema,
	HospitalEntryWithoutIdSchema,
	OccupationalHealthcareEntryWithoutIdSchema,
]);

// Function to parse and validate the entry data
export const toNewEntry = (object: unknown): EntryWithoutId => {
	const parsedEntry = EntryWithoutIdSchema.parse(object);
	return {
		...parsedEntry,
		diagnosisCodes: parseDiagnosisCodes(object),
	};
};

// Function to parse diagnosis codes
const parseDiagnosisCodes = (
	object: unknown
): Array<DiagnosisEntry["code"]> => {
	if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
		// we will just trust the data to be in correct form
		return [] as Array<DiagnosisEntry["code"]>;
	}

	return object.diagnosisCodes as Array<DiagnosisEntry["code"]>;
};

// NOTE: Patient
export const NewPatientEntrySchema = z.object({
	name: z.string(),
	ssn: z.string(),
	occupation: z.string(),
	gender: z.nativeEnum(Gender),
	dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Invalid date format",
	}),
	entries: z.array(EntrySchema).optional().default([]),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	return NewPatientEntrySchema.parse(object);
};
