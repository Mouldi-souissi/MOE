import React, { Component } from "react";
import UserContext from "../UserContext";
// import moment from "moment";
// import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";

export class SessionStats extends Component {
	static contextType = UserContext;

	componentDidMount() {
		this.context.getSessions();
	}
	render() {
		// const sessions = this.context.sessions.filter(
		// 	(el) => el.name === this.props.match.params.name
		// );
		const sessions = this.context.sessions;

		return (
			<div>
				{sessions.map((session, i) => (
					<div className='myExams mr-5 ml-5 mt-5' key={i}>
						<h4 className='center mb-3'>Meeting Name:{session.name}</h4>
						<table className='table table-striped'>
							<thead>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>User</th>
									<th scope='col'>E-mail</th>
									<th scope='col'>Joined</th>
								</tr>
							</thead>
							{session.attendees.map((attendee, i) => (
								<tbody key={i}>
									<tr>
										<th scope='row'>{i + 1}</th>

										<td>
											{attendee.user.firstName} {attendee.user.lastName}
										</td>
										<td>{attendee.user.email}</td>
										<td>{attendee.joinDate}</td>
									</tr>
								</tbody>
							))}
						</table>
					</div>
				))}
			</div>
		);
	}
}

export default withRouter(SessionStats);
