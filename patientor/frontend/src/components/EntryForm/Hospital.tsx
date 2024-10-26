import { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

import { PatientEntry, EntryWithoutId } from "../../types";
import patientService from "../../services/patients";
import { useNotifier } from "../../contexts/NotificationContext";

interface AddEntryProps {
	setEntries: React.Dispatch<React.SetStateAction<PatientEntry["entries"]>>;
	setAddEntryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hospital = (props: AddEntryProps) => {
	const { id } = useParams<{ id: string }>();
	const notify = useNotifier();

	const [description, setDescription] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [specialist, setSpecialist] = useState<string>("");
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
	const [dischargeDate, setDischargeDate] = useState<string>("");
	const [criteria, setCriteria] = useState<string>("");

	const handleCancel = () => {
		props.setAddEntryModal(false);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const values: EntryWithoutId = {
			type: "Hospital",
			description,
			date,
			specialist,
			diagnosisCodes,
			discharge: {
				date: dischargeDate,
				criteria,
			},
		};

		try {
			const entry = await patientService.addEntry(values, id);
			props.setEntries((entries) => entries.concat(entry));
			props.setAddEntryModal(false);

			if (entry) {
				notify({
					message: "Entry added successfully",
					alert: "success",
				});
			}
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				if (e?.response?.data) {
					const message =
						e.response.data.error[0].unionErrors[1].issues[0].message;
					console.error(message);

					notify({
						message: message,
						alert: "error",
					});
				} else {
					console.error("Unrecognized axios error");

					notify({
						message: "Unrecognized axios error",
						alert: "error",
					});
				}
			}
		}
	};

	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<h2>New Hospital Entry</h2>
				<div style={{ marginBottom: "1rem" }}>
					<TextField
						label="Description"
						variant="filled"
						fullWidth
						required
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div style={{ marginBottom: "1rem" }}>
					<TextField
						type="date"
						label="Date"
						variant="filled"
						fullWidth
						required
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>
				<div style={{ marginBottom: "1rem" }}>
					<TextField
						label="Specialist"
						variant="filled"
						fullWidth
						required
						onChange={(e) => setSpecialist(e.target.value)}
					/>
				</div>
				<div style={{ marginBottom: "1rem" }}>
					<TextField
						type="text"
						label="Diagnosis Codes"
						variant="filled"
						fullWidth
						required
						onChange={(e) => setDiagnosisCodes(e.target.value.split(", "))}
					/>
				</div>
				<div style={{ marginBottom: "1rem" }}>
					<TextField
						type="date"
						label="Discharge Date"
						variant="filled"
						fullWidth
						required
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e) => setDischargeDate(e.target.value)}
					/>
				</div>
				<div style={{ marginBottom: "1rem" }}>
					<TextField
						label="Criteria"
						variant="filled"
						fullWidth
						required
						onChange={(e) => setCriteria(e.target.value)}
					/>
				</div>
				<Grid container spacing={2}>
					<Grid item xs>
						<Button
							type="button"
							onClick={handleCancel}
							variant="contained"
							color="error"
						>
							Cancel
						</Button>
					</Grid>
					<Grid style={{ textAlign: "right" }} item xs>
						<Button type="submit" variant="contained" color="inherit">
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default Hospital;
