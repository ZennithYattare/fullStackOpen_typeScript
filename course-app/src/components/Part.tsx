import { CoursePart } from "../types";
import { assertNever } from "../utils";

interface PartProps {
	part: CoursePart;
}

const Part = (props: PartProps) => {
	switch (props.part.kind) {
		case "basic":
			return (
				<p>
					<b>
						{props.part.name} {props.part.exerciseCount}
					</b>
					<br />
					<em>{props.part.description}</em>
				</p>
			);
		case "group":
			return (
				<p>
					<b>
						{props.part.name} {props.part.exerciseCount}
					</b>
          <br />
					<span>project exercises {props.part.groupProjectCount}</span>
				</p>
			);
		case "background":
			return (
				<div>
					<b>
						{props.part.name} {props.part.exerciseCount}
					</b>
          <br />
					<em>{props.part.description}</em>
          <br />
					<span>required background: {props.part.backgroundMaterial}</span>
				</div>
			);
		case "special":
			return (
				<p>
					<b>
						{props.part.name} {props.part.exerciseCount}
					</b>
          <br />
					<em>{props.part.description}</em>
          <br />
					<span>required skills: {props.part.requirements.join(", ")}</span>
				</p>
			);
		default:
			return assertNever(props.part);
	}
};

export default Part;
