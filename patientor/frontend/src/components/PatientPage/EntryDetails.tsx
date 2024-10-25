import { Chip } from "@mui/material";
import { Entry, DiagnosisEntry } from "../../types";
import { assertNever } from "../../utils";

interface EntryDetailsProps {
	// Define EntryDetailsProps interface
	entry: Entry;
	diagnosisMap: Record<string, DiagnosisEntry>;
}

const healthCheckRatingDescriptions = [
	"Healthy",
	"Low Risk",
	"High Risk",
	"Critical Risk",
];

const EntryDetails = (props: EntryDetailsProps) => {
	switch (props.entry.type) {
		case "HealthCheck":
			return (
				<li>
					<u style={{ marginRight: "12px" }}>{props.entry.date}</u>
					<Chip label="Health Check" color="warning" size="small" />
					<p>{props.entry.description}</p>
					<span>
						Health check rating:{" "}
						<b>
							{healthCheckRatingDescriptions[props.entry.healthCheckRating]}
						</b>
					</span>
					<p>
						<i>diagnosed by {props.entry.specialist}</i>
					</p>
					<hr />
				</li>
			);
		case "Hospital":
			return (
				<li>
					<u style={{ marginRight: "12px" }}>{props.entry.date}</u>{" "}
					<Chip
						style={{ marginRight: "12px" }}
						label="Hospital"
						color="primary"
						size="small"
					/>
					<p>{props.entry.description}</p>
					<ul>
						{props.entry.diagnosisCodes?.map((code) => (
							<li key={code}>
								{code} - {props.diagnosisMap[code]?.name || "Unknown diagnosis"}
							</li>
						))}
					</ul>
					<p>
						Discharged on {props.entry.discharge.date}:{" "}
						{props.entry.discharge.criteria}
					</p>
					<p>
						<i>diagnosed by {props.entry.specialist}</i>
					</p>
					<hr />
				</li>
			);
		case "OccupationalHealthcare":
			return (
				<li>
					<u style={{ marginRight: "12px" }}>{props.entry.date}</u>{" "}
					<Chip
						style={{ marginRight: "12px" }}
						label="Occupational Healthcare"
						color="secondary"
						size="small"
					/>
					<span>[Employer name: {props.entry.employerName}]</span>
					<p>{props.entry.description}</p>
					{props.entry.sickLeave && (
						<p>
							Sick leave: {props.entry.sickLeave.startDate} to{" "}
							{props.entry.sickLeave.endDate}
						</p>
					)}
					<p>
						<i>diagnosed by {props.entry.specialist}</i>
					</p>
					<hr />
				</li>
			);
		default:
			return assertNever(props.entry);
	}
};

export default EntryDetails;
