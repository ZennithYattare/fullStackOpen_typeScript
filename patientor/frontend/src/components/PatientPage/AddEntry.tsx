import { PatientEntry } from "../../types";
import HealthCheck from "../EntryForm/HealthCheck";

interface AddEntryProps {
	setEntries: React.Dispatch<React.SetStateAction<PatientEntry["entries"]>>;
	setAddEntryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEntry = (props: AddEntryProps) => {
	return (
		<>
			<HealthCheck setEntries={props.setEntries} setAddEntryModal={props.setAddEntryModal} />
		</>
	);
};

export default AddEntry;
