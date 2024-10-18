import { z } from "zod";

import { NewPatientEntry, Gender, HealthCheckRating } from "./types";

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
