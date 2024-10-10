import { useState, useEffect } from "react";

import { DiaryEntry } from "../types";
import { getAllDiaries } from "../services/diaryService";

const Content = () => {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

	useEffect(() => {
		getAllDiaries().then((diaries) => {
			setDiaries(diaries);
		});
	}, []);

	return (
		<div>
			<ul style={{ listStyleType: "none", paddingLeft: "0px" }}>
				{diaries.map((diary) => (
					<li key={diary.id}>
						<p>
							<strong>{diary.date}</strong>
						</p>
						<span>visiblity: {diary.visibility}</span>
						<br></br>
						<span>weather: {diary.weather}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Content;
