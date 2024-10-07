interface ContentProps {
	courseParts: {
		name: string;
		exerciseCount: number;
	}[];
}

const Content = (props: ContentProps) => {
	return (
		<>
			{props.courseParts.map((part, i) => (
				<p key={i}>
					{part.name} {part.exerciseCount}
				</p>
			))}
		</>
	);
};

export default Content;
