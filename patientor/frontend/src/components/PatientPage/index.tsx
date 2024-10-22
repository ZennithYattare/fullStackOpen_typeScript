import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { PatientEntry, DiagnosisEntry } from "../../types";
import { MaleSharp, FemaleSharp, TransgenderSharp } from "@mui/icons-material";

const PatientPage = () => {
	const { id } = useParams<{ id: string }>();

	const [patient, setPatient] = useState<PatientEntry>();
	const [diagnoses, setDiagnoses] = useState<DiagnosisEntry[]>([]);

	useEffect(() => {
		const fetchPatient = async () => {
			if (id) {
				const patient = await patientService.getOne(id);
				console.log(patient);
				setPatient(patient);
			}
		};
		void fetchPatient();
	}, [id]);

	useEffect(() => {
		const fetchDiagnoses = async () => {
			const diagnoses = await diagnosisService.getAll();
			console.log(diagnoses);
			setDiagnoses(diagnoses);
		};
		void fetchDiagnoses();
	}, []);

	if (!patient) {
		return <div>Error 404: Patient not found</div>;
	}

	console.log(patient);

	const diagnosisMap = diagnoses.reduce((acc, diagnosis) => {
		acc[diagnosis.code] = diagnosis;
		return acc;
	}, {} as Record<string, DiagnosisEntry>);

	return (
		<>
			<h2>
				{patient.name}{" "}
				{patient.gender === "male" ? (
					<MaleSharp />
				) : patient.gender === "female" ? (
					<FemaleSharp />
				) : (
					<TransgenderSharp />
				)}
			</h2>
			<span>date of birth: {patient.dateOfBirth}</span>
			<br />
			<span>ssn: {patient.ssn}</span>
			<br />
			<span>occupation: {patient.occupation}</span>

			<h3>entries</h3>
			<p>
				{patient.entries.map((entry) => (
					<div key={entry.id}>
						<u>{entry.date}</u>
						<p>{entry.description}</p>
						<ul>
							{entry.diagnosisCodes?.map((code) => (
								<li key={code}>
									{code} - {diagnosisMap[code]?.name || "Unknown diagnosis"}
								</li>
							))}
						</ul>
					</div>
				))}
			</p>
		</>
	);
};

export default PatientPage;
