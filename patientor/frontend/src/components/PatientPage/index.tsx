import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import patientService from "../../services/patients";
import { Patient } from "../../types";
import { MaleSharp, FemaleSharp, TransgenderSharp } from "@mui/icons-material";

const PatientPage = () => {
	const { id } = useParams<{ id: string }>();

	const [patient, setPatient] = useState<Patient>();

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
		</>
	);
};

export default PatientPage;
