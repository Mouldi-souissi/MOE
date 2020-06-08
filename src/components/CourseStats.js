import React, { Component } from "react";
// import moment from "moment";
import { withRouter } from "react-router-dom";
import axios from "axios";

export class CourseStats extends Component {
	state = {
		course: [],
	};

	getStats = () => {
		axios({
			url: `https://app.visioconf.site/api/v1/courses/${this.props.match.params.id}/enrollments`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) =>
				this.setState({
					course: res.data.payload,
				})
			)
			.catch((err) => console.log(err));
	};

	componentDidMount() {
		this.getStats();
	}
	render() {
		const course = this.state.course;
		return (
			<div>
				<div className='scores mr-5 ml-5 '>
					<button
						className='btn btn-primary ml-5'
						onClick={() => this.props.history.goBack()}>
						Go Back
					</button>
					<h4 className='center mb-3'>{this.props.location.courseTitle}</h4>
					<table className='table table-striped'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Student</th>
								<th scope='col'>Enrollment Date</th>
								<th scope='col'>Status</th>
								<th scope='col'>Completed Date</th>
							</tr>
						</thead>
						{course.map((course, i) => (
							<tbody key={i}>
								<tr>
									<th scope='row'>{i + 1}</th>

									<td>{course.studentId}</td>
									<td>{course.enrollmentDate}</td>
									<td>{course.status}</td>
									<td>{course.completedDate}</td>
								</tr>
							</tbody>
						))}
					</table>
				</div>
			</div>
		);
	}
}

export default withRouter(CourseStats);
