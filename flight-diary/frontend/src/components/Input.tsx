import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

import { Weather, Visibility, DiaryEntry } from "../types";
import { createDiary } from "../services/diaryService";

interface InputProps {
	diaries: DiaryEntry[];
	setDiaries: Dispatch<SetStateAction<DiaryEntry[]>>;
}

const Input = (props: InputProps) => {
	const [date, setDate] = useState("");
	const [visibility, setVisibility] = useState(Visibility.Great);
	const [weather, setWeather] = useState(Weather.Sunny);
	const [comment, setComment] = useState("");
	const [error, setError] = useState<string | null>(null);

	const diaryCreation = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		try {
			const diary = await createDiary({ date, visibility, weather, comment });
			props.setDiaries((prevDiaries) =>
				prevDiaries.concat(diary as DiaryEntry)
			);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				if (
					error?.response?.data &&
					typeof error?.response?.data === "string"
				) {
					const message = error.response.data.replace(
						"Something went wrong. Error: ",
						""
					);
					console.error(message);
					setError(message);
				} else {
					setError("Unrecognized axios error");
				}
			} else {
				console.error("Unknown error", error);
				setError("Unknown error");
			}

			// Reset error state to null after 5 seconds
			setTimeout(() => {
				setError(null);
			}, 5000);
		}
	};

	return (
		<>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<form onSubmit={diaryCreation}>
				date
				<input
					type="text"
					placeholder="YYYY-MM-DD"
					value={date}
					onChange={(event) => setDate(event.target.value)}
				/>
				<br />
				visibility
				<input
					type="text"
					placeholder="visibility"
					value={visibility}
					onChange={(event) => setVisibility(event.target.value as Visibility)}
				/>
				<br />
				weather
				<input
					type="text"
					placeholder="weather"
					value={weather}
					onChange={(event) => setWeather(event.target.value as Weather)}
				/>
				<br />
				comment
				<input
					type="text"
					placeholder="comment"
					value={comment}
					onChange={(event) => setComment(event.target.value)}
				/>
				<br />
				<button type="submit">add</button>
			</form>
		</>
	);
};

export default Input;
