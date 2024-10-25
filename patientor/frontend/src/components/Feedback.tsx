import { Alert } from "@mui/material";
import { useAtom } from "jotai";

import { notificationAtom } from "../contexts/NotificationContext";

const Feedback = () => {
	const [notification] = useAtom(notificationAtom);

	const { message, alert } = notification;

	if (message === null) {
		return null;
	}

	return alert ? (
		<Alert style={{ marginTop: "1rem" }} severity={alert}>
			{message}
		</Alert>
	) : null;
};

export default Feedback;
