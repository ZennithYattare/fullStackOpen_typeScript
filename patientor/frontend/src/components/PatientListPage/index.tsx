import { useState } from "react";
import {
	Box,
	Table,
	Button,
	TableHead,
	Typography,
	TableCell,
	TableRow,
	TableBody,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { PatientFormValues, PatientEntry } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";

interface Props {
	patients: PatientEntry[];
	setPatients: React.Dispatch<React.SetStateAction<PatientEntry[]>>;
}

const PatientListPage = ({ patients, setPatients }: Props) => {
	const navigate = useNavigate();

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	const submitNewPatient = async (values: PatientFormValues) => {
		try {
			const patient = await patientService.create(values);
			setPatients(patients.concat(patient));
			setModalOpen(false);
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				if (e?.response?.data && typeof e?.response?.data === "string") {
					const message = e.response.data.replace(
						"Something went wrong. Error: ",
						""
					);
					console.error(message);
					setError(message);
				} else {
					setError("Unrecognized axios error");
				}
			} else {
				console.error("Unknown error", e);
				setError("Unknown error");
			}
		}
	};

	const handlePatientClick = (id: string) => {
		navigate(`/patients/${id}`);
	};

	return (
		<div className="App">
			<Box>
				<Typography align="center" variant="h6">
					Patient list
				</Typography>
			</Box>
			<Table style={{ marginBottom: "1em" }}>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Gender</TableCell>
						<TableCell>Occupation</TableCell>
						<TableCell>Health Rating</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Object.values(patients).map((patient: PatientEntry) => (
						<TableRow
							key={patient.id}
							onClick={() => handlePatientClick(patient.id)}
							sx={{ "&:hover": { cursor: "pointer" } }}
						>
							<TableCell>{patient.name}</TableCell>
							<TableCell>{patient.gender}</TableCell>
							<TableCell>{patient.occupation}</TableCell>
							<TableCell>
								<HealthRatingBar showText={false} rating={1} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<AddPatientModal
				modalOpen={modalOpen}
				onSubmit={submitNewPatient}
				error={error}
				onClose={closeModal}
			/>
			<Button variant="contained" onClick={() => openModal()}>
				Add New Patient
			</Button>
		</div>
	);
};

export default PatientListPage;
