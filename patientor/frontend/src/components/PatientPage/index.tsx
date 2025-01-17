import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import EntryDetails from "./EntryDetails";
import AddEntry from "./AddEntry";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { PatientEntry, DiagnosisEntry } from "../../types";
import { MaleSharp, FemaleSharp, TransgenderSharp } from "@mui/icons-material";
import { Button } from "@mui/material";

const PatientPage = () => {
	const { id } = useParams<{ id: string }>();

	const [patient, setPatient] = useState<PatientEntry>();
	const [diagnoses, setDiagnoses] = useState<DiagnosisEntry[]>([]);
	const [entries, setEntries] = useState<PatientEntry["entries"]>([]);
	const [addEntryModal, setAddEntryModal] = useState(false);

	useEffect(() => {
		const fetchPatient = async () => {
			if (id) {
				const patient = await patientService.getOne(id);
				console.log(patient);
				setPatient(patient);

				if (patient.entries) {
					setEntries(patient.entries);
				}
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
			<br />
			{!addEntryModal && (
				<Button
					style={{ marginTop: "12px" }}
					variant="contained"
					color="success"
					onClick={() => setAddEntryModal(!addEntryModal)}
				>
					Add New Entry
				</Button>
			)}
			{addEntryModal && (
				<AddEntry
					setEntries={setEntries}
					setAddEntryModal={setAddEntryModal}
					diagnoses={diagnoses}
				/>
			)}
			<h3>entries</h3>
			<ul>
				{entries
					.slice() // Create a shallow copy of the entries array to avoid mutating the original array
					.sort(
						(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
					) // Sort by date in descending order
					.map((entry) => (
						<EntryDetails
							key={entry.id}
							entry={entry}
							diagnosisMap={diagnosisMap}
						/>
					))}
			</ul>
		</>
	);
};

export default PatientPage;
