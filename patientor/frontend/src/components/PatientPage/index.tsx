import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import patientService from "../../services/patients";
import { PatientEntry } from "../../types";
import { MaleSharp, FemaleSharp, TransgenderSharp } from "@mui/icons-material";

const PatientPage = () => {
	const { id } = useParams<{ id: string }>();

	const [patient, setPatient] = useState<PatientEntry>();

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

	if (!patient) {
		return <div>Error 404: Patient not found</div>;
	}

	console.log(patient);

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
								<li key={code}>{code}</li>
							))}
						</ul>
					</div>
				))}
			</p>
		</>
	);
};

export default PatientPage;
