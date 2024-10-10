import { Dispatch, SetStateAction, useState } from "react";

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

	const diaryCreation = (event: React.SyntheticEvent) => {
		event.preventDefault();
		createDiary({ date, visibility, weather, comment }).then((diary) => {
			props.setDiaries(props.diaries.concat(diary as DiaryEntry));
		});
	};

	return (
		<>
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
				<button type="submit">
					add
				</button>
			</form>
		</>
	);
};

export default Input;
