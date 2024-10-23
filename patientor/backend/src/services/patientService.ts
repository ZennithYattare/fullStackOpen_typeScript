import { v4 as uuidv4 } from "uuid";

import patients from "../../data/patients";

import {
	NewPatientEntry,
	NonSensitivePatient,
	PatientEntry,
	EntryWithoutId,
	Entry,
} from "../types";

const getEntries = (): PatientEntry[] => {
	return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const findById = (id: string): PatientEntry | undefined => {
	const entry = patients.find((p) => p.id === id);
	return entry;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
	const newPatientEntry = {
		id: uuidv4(),
		...entry,
	};

	patients.push(newPatientEntry);
	return newPatientEntry;
};

const addEntry = (entry: EntryWithoutId, patient: PatientEntry): Entry => {
	const newEntry = {
		id: uuidv4(),
		...entry,
	};

	patient.entries.push(newEntry);
	return newEntry;
};

export default {
	getEntries,
	getNonSensitiveEntries,
	findById,
	addPatient,
	addEntry,
};
