import React, { Component } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";

export class CourseLi extends Component {
	componentDidMount() {
		this.context.getSessions();
	}
	static contextType = UserContext;
	render() {
		const course = this.props.course;
		// const sessions = this.context.sessions;
		return (
			<tbody>
				<tr align='center'>
					<td className='align-middle'>
						<div>{course.title}</div>
					</td>
					<td className='align-middle'>
						<div>
							{course.createdBy.firstName} {course.createdBy.lastName}
						</div>
					</td>
					<td className='align-middle'>
						<div>{course.theme.label}</div>
					</td>
					<td className='align-middle'>
						<Link to={`/sessionStats${course.title}`}>
							<button className='btn btn-primary'>Stats</button>
						</Link>
					</td>
				</tr>
			</tbody>
		);
	}
}

export default CourseLi;
