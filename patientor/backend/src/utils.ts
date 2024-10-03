import { z } from "zod";

import { NewPatientEntry, Gender } from "./types";

export const NewPatientEntrySchema = z.object({
	name: z.string(),
	dateOfBirth: z.string().date(),
	ssn: z.string(),
	gender: z.nativeEnum(Gender),
	occupation: z.string(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	return NewPatientEntrySchema.parse(object);
};
