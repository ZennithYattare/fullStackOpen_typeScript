import { useState, useEffect } from "react";

import { DiaryEntry } from "./types";
import { getAllDiaries } from "./services/diaryService";

import Header from "./components/Header";
import Content from "./components/Content";
import Input from "./components/Input";

function App() {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

	useEffect(() => {
		getAllDiaries().then((diaries) => {
			setDiaries(diaries);
		});
	}, []);

	return (
		<div>
			<Header name="Add new entry" />
			<Input diaries={diaries} setDiaries={setDiaries}/>
			<Header name="Diary entries" />
			<Content diaries={diaries}/>
		</div>
	);
}

export default App;
