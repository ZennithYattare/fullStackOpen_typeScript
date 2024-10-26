import { useState } from "react";
import {
	TextField,
	Grid,
	Button,
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

import { PatientEntry, EntryWithoutId, DiagnosisEntry } from "../../types";
import patientService from "../../services/patients";
import { useNotifier } from "../../contexts/NotificationContext";

interface AddEntryProps {
	setEntries: React.Dispatch<React.SetStateAction<PatientEntry["entries"]>>;
	setAddEntryModal: React.Dispatch<React.SetStateAction<boolean>>;
	diagnoses: DiagnosisEntry[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const OccupationalHC = (props: AddEntryProps) => {
	const { id } = useParams<{ id: string }>();
	const notify = useNotifier();

	const [description, setDescription] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [specialist, setSpecialist] = useState<string>("");
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
	const [employerName, setEmployerName] = useState<string>("");
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");

	const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
		const {
			target: { value },
		} = event;
		setDiagnosisCodes(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	const handleCancel = () => {
		props.setAddEntryModal(false);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const values: EntryWithoutId = {
			type: "OccupationalHealthcare",
			description,
			date,
			specialist,
			employerName,
			diagnosisCodes,
			sickLeave: {
				startDate,
				endDate,
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
				<h2>New Occupational Healthcare Entry</h2>
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
						label="Employer Name"
						variant="filled"
						fullWidth
						required
						onChange={(e) => setEmployerName(e.target.value)}
					/>
				</div>
				<div style={{ marginBottom: "1rem" }}>
					<FormControl fullWidth required>
						<InputLabel id="multiple-checkbox-label">
							Diagnosis Codes
						</InputLabel>
						<Select
							labelId="multiple-checkbox-label"
							id="multiple-checkbox"
							multiple
							value={diagnosisCodes}
							onChange={handleChange}
							input={<OutlinedInput label="Diagnosis Codes" />}
							renderValue={(selected) => selected.join(", ")}
							MenuProps={MenuProps}
							fullWidth
							required
						>
							{props.diagnoses.map((diagnosis) => (
								<MenuItem key={diagnosis.code} value={diagnosis.code}>
									<Checkbox
										checked={diagnosisCodes.indexOf(diagnosis.code) > -1}
									/>
									<ListItemText
										primary={diagnosis.name}
										secondary={diagnosis.code}
									/>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div style={{ marginBottom: "1rem" }}>
					<TextField
						type="date"
						label="Sick Leave Start Date"
						variant="filled"
						fullWidth
						required
						InputLabelProps={{
							shrink: true,
						}}
						inputProps={{
							min: date, // Set the minimum value for the discharge date
						}}
						onChange={(e) => setStartDate(e.target.value)}
					/>
				</div>
				<div style={{ marginBottom: "1rem" }}>
					<TextField
						type="date"
						label="Sick Leave End Date"
						variant="filled"
						fullWidth
						required
						InputLabelProps={{
							shrink: true,
						}}
						inputProps={{
							min: startDate, // Set the minimum value for the discharge date
						}}
						onChange={(e) => setEndDate(e.target.value)}
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

export default OccupationalHC;
