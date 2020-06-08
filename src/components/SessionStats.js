import React, { Component } from "react";
// import moment from "moment";
import { withRouter } from "react-router-dom";
import axios from "axios";

export class SessionStats extends Component {
	state = {
		sessions: [],
	};

	getSessions = () => {
		axios({
			url: `https://app.visioconf.site/api/v1/courses/${this.props.match.params.id}/meetings`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) =>
				this.setState({
					sessions: res.data.payload,
				})
			)
			.catch((err) => console.log(err));
	};

	componentDidMount() {
		this.getSessions();
	}
	render() {
		const sessions = this.state.sessions;
		return (
			<div>
				<button
					style={{ marginTop: "100px" }}
					className='btn btn-primary ml-5'
					onClick={() => this.props.history.goBack()}>
					Go Back
				</button>
				{sessions.map((session, i) => (
					<div className='scores mr-5 ml-5' key={i}>
						<div className='d-flex align-items-center justify-content-between mb-5'>
							<h5>Meeting Name: {session.name}</h5>
							<h5>Created: {session.createdDate}</h5>
							<h5>
								Ended: {session.endDate ? session.endDate : "Still running"}
							</h5>
						</div>
						{/* <h4 className='center mb-3'>Meeting Name:{session.name}</h4> */}
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
