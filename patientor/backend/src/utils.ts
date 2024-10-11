import { z } from "zod";

import { NewPatientEntry, Gender } from "./types";

// Define the Entry schema
export const EntrySchema = z.object({});

export const NewPatientEntrySchema = z.object({
	name: z.string(),
	ssn: z.string(),
	occupation: z.string(),
	gender: z.nativeEnum(Gender),
	dateOfBirth: z.string().date(),
	entries: z.array(EntrySchema).optional().default([]),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	return NewPatientEntrySchema.parse(object);
};
