import { useState } from "react";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

import { PatientEntry } from "../../types";
import HealthCheck from "../EntryForm/HealthCheck";
import Hospital from "../EntryForm/Hospital";
import OccupationalHC from "../EntryForm/OccupationalHC";
import React from "react";

interface AddEntryProps {
	setEntries: React.Dispatch<React.SetStateAction<PatientEntry["entries"]>>;
	setAddEntryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEntry = (props: AddEntryProps) => {
	const [entryType, setEntryType] = useState<string>("HealthCheck");

	switch (entryType) {
		case "HealthCheck":
			return (
				<>
					<RadioGroup
						row
						aria-labelledby="row-radio-buttons-group-label"
						name="row-radio-buttons-group"
						defaultValue={entryType}
					>
						<FormControlLabel
							value="HealthCheck"
							control={<Radio />}
							label="Health Check"
							onChange={(e) =>
								setEntryType((e.target as HTMLInputElement).value)
							}
						/>
						<FormControlLabel
							value="Hospital"
							control={<Radio />}
							label="Hospital"
							onChange={(e) =>
								setEntryType((e.target as HTMLInputElement).value)
							}
						/>
						<FormControlLabel
							value="OccupationalHealthcare"
							control={<Radio />}
							label="Occupational Healthcare"
							onChange={(e) =>
								setEntryType((e.target as HTMLInputElement).value)
							}
						/>
					</RadioGroup>
					<HealthCheck
						setEntries={props.setEntries}
						setAddEntryModal={props.setAddEntryModal}
					/>
				</>
			);
		case "Hospital":
			return (
				<>
					<RadioGroup
						row
						aria-labelledby="row-radio-buttons-group-label"
						name="row-radio-buttons-group"
						defaultValue={entryType}
					>
						<FormControlLabel
							value="HealthCheck"
							control={<Radio />}
							label="Health Check"
							onChange={(e) =>
								setEntryType((e.target as HTMLInputElement).value)
							}
						/>
						<FormControlLabel
							value="Hospital"
							control={<Radio />}
							label="Hospital"
							onChange={(e) =>
								setEntryType((e.target as HTMLInputElement).value)
							}
						/>
						<FormControlLabel
							value="OccupationalHealthcare"
							control={<Radio />}
							label="Occupational Healthcare"
							onChange={(e) =>
								setEntryType((e.target as HTMLInputElement).value)
							}
						/>
					</RadioGroup>
					<Hospital
						setEntries={props.setEntries}
						setAddEntryModal={props.setAddEntryModal}
					/>
				</>
			);
		case "OccupationalHealthcare":
			return (
				<>
					<RadioGroup
						row
						aria-labelledby="row-radio-buttons-group-label"
						name="row-radio-buttons-group"
						defaultValue={entryType}
					>
						<FormControlLabel
							value="HealthCheck"
							control={<Radio />}
							label="Health Check"
							onChange={(e) =>
								setEntryType((e.target as HTMLInputElement).value)
							}
						/>
						<FormControlLabel
							value="Hospital"
							control={<Radio />}
							label="Hospital"
							onChange={(e) =>
								setEntryType((e.target as HTMLInputElement).value)
							}
						/>
						<FormControlLabel
							value="OccupationalHealthcare"
							control={<Radio />}
							label="Occupational Healthcare"
							onChange={(e) =>
								setEntryType((e.target as HTMLInputElement).value)
							}
						/>
					</RadioGroup>
					<OccupationalHC
						setEntries={props.setEntries}
						setAddEntryModal={props.setAddEntryModal}
					/>
				</>
			);
		default:
			return null;
	}
};

export default AddEntry;
