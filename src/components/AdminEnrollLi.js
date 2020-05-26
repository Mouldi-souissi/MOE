import React, { Component } from "react";
import UserContext from "../UserContext";

export class AdminEnrollLi extends Component {
	static contextType = UserContext;
	render() {
		return (
			<tbody>
				<tr align='center'>
					<td>
						<div className='avatar-admin'></div>
					</td>
					<td className='align-middle'>
						<div>{this.props.enroll.label}</div>
					</td>

					<td className='align-middle'>
						<div>{this.props.enroll.status}</div>
					</td>
					<td className='align-middle'>
						{this.props.enroll.status === "ACCEPTED" ? (
							<button
								className='btn btn-danger'
								onClick={() =>
									this.context.themeEnroll(
										this.props.enroll.themeId,
										this.props.enroll.studentId,
										this.props.enroll.status
									)
								}>
								UnEnroll
							</button>
						) : (
							<button
								className='btn btn-primary'
								onClick={() =>
									this.context.themeEnroll(
										this.props.enroll.themeId,
										this.props.enroll.studentId,
										this.props.enroll.status
									)
								}>
								Enroll
							</button>
						)}
					</td>
				</tr>
			</tbody>
		);
	}
}

export default AdminEnrollLi;
