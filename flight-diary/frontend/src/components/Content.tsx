import { DiaryEntry } from "../types";

interface ContentProps {
	diaries: DiaryEntry[];
}

const Content = (props: ContentProps) => {
	return (
		<div>
			<ul style={{ listStyleType: "none", paddingLeft: "0px" }}>
				{props.diaries.map((diary) => (
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
