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
					type="date"
					placeholder="YYYY-MM-DD"
					value={date}
					onChange={(event) => setDate(event.target.value)}
				/>
				<br />
				visibility
				<label style={{ marginLeft: "12px" }} htmlFor="great">
					great
				</label>
				<input
					defaultChecked
					id="great"
					name="visibility"
					type="radio"
					value={Visibility.Great}
					onChange={(event) => setVisibility(event.target.value as Visibility)}
				/>
				<label style={{ marginLeft: "12px" }} htmlFor="good">
					good
				</label>
				<input
					id="good"
					name="visibility"
					type="radio"
					value={Visibility.Good}
					onChange={(event) => setVisibility(event.target.value as Visibility)}
				/>
				<label style={{ marginLeft: "12px" }} htmlFor="ok">
					ok
				</label>
				<input
					id="ok"
					name="visibility"
					type="radio"
					value={Visibility.Ok}
					onChange={(event) => setVisibility(event.target.value as Visibility)}
				/>
				<label style={{ marginLeft: "12px" }} htmlFor="poor">
					poor
				</label>
				<input
					id="poor"
					name="visibility"
					type="radio"
					value={Visibility.Poor}
					onChange={(event) => setVisibility(event.target.value as Visibility)}
				/>
				<br />
				weather
				<label style={{ marginLeft: "12px" }} htmlFor="sunny">
					sunny
				</label>
				<input
					defaultChecked
					id="sunny"
					name="weather"
					type="radio"
					value={Weather.Sunny}
					onChange={(event) => setWeather(event.target.value as Weather)}
				/>
				<label style={{ marginLeft: "12px" }} htmlFor="rainy">
					rainy
				</label>
				<input
					id="rainy"
					name="weather"
					type="radio"
					value={Weather.Rainy}
					onChange={(event) => setWeather(event.target.value as Weather)}
				/>
				<label style={{ marginLeft: "12px" }} htmlFor="cloudy">
					cloudy
				</label>
				<input
					id="cloudy"
					name="weather"
					type="radio"
					value={Weather.Cloudy}
					onChange={(event) => setWeather(event.target.value as Weather)}
				/>
				<label style={{ marginLeft: "12px" }} htmlFor="stormy">
					stormy
				</label>
				<input
					id="stormy"
					name="weather"
					type="radio"
					value={Weather.Stormy}
					onChange={(event) => setWeather(event.target.value as Weather)}
				/>
				<label style={{ marginLeft: "12px" }} htmlFor="windy">
					windy
				</label>
				<input
					id="windy"
					name="weather"
					type="radio"
					value={Weather.Windy}
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
