// NOTE: Diagnosis
export interface DiagnosisEntry {
	code: string;
	name: string;
	latin?: string;
}

// NOTE: Patient
export interface PatientEntry {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
}

export type NonSensitivePatient = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
