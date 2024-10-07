import { CoursePart } from "../types";
import Part from "./Part";

// Define the ContentProps interface
interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
	return (
		<div>
			{props.courseParts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
		</div>
	);
};

export default Content;
