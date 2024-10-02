import patients from "../data/patients";

import { NonSensitivePatient, PatientEntry } from "../types";

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

const addEntry = () => {
	return null;
};

const findById = (id: string): PatientEntry | undefined => {
	const entry = patients.find((p) => p.id === id);
	return entry;
};

export default {
	getEntries,
	addEntry,
	getNonSensitiveEntries,
	findById,
};
