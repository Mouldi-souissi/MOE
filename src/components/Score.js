import React, { Component } from "react";

export class Score extends Component {
	render() {
		return (
			<tbody>
				<tr>
					<th scope='row'>{this.props.i}</th>
					<td>{this.props.score.student.firstName}</td>
					<td>{this.props.score.student.lastName}</td>
					<td>{this.props.score.score}</td>
					<td>{this.props.score.status}</td>
					<td>{this.props.score.endDate}</td>
				</tr>
			</tbody>
		);
	}
}

export default Score;
