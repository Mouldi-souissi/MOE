import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { withRouter } from "react-router-dom";

export class AdminExams extends Component {
	state = {
		exams: [],
	};

	getExamsByCourse = () => {
		axios({
			url: `https://app.visioconf.site/api/v1/courses/${this.props.match.params.id}/exams`,
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					exams: res.data.payload,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	componentDidMount() {
		this.getExamsByCourse();
	}
	render() {
		const exams = this.state.exams;
		return (
			<div>
				<div className='scores mr-5 ml-5'>
					<button
						className='btn btn-primary ml-5'
						onClick={() => this.props.history.goBack()}>
						Go Back
					</button>
					<h4 className='center mb-3'>
						Exams
						{/* {this.props.location.courseTitle} */}
					</h4>
					<table className='table table-striped'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Title</th>
								<th scope='col'>Duration</th>
								<th scope='col'>Start Date</th>
								<th scope='col'>Status</th>
								<th scope='col'>Check Scores</th>
							</tr>
						</thead>
						{exams.map((exam, i) => (
							<tbody key={i}>
								<tr>
									<th scope='row'>{i + 1}</th>

									{/* <td>
										{moment(new Date()).isSameOrAfter(
											moment(exam.startDate).add(exam.durationMin, "minutes")
										) ? (
											<Link to={`/scores${exam.id}`}>{exam.title}</Link>
										) : (
											<Link to={`/exam${exam.id}`}>{exam.title}</Link>
										)}
									</td> */}
									<td>{exam.title}</td>

									<td>{exam.durationMin}</td>
									<td>{exam.startDate}</td>
									<td>
										{moment(new Date()).isSameOrAfter(
											moment(exam.startDate).add(exam.durationMin, "minutes")
										)
											? "Finished"
											: "Upcoming"}
									</td>
									<td>
										<Link to={`/scores${exam.id}`}>
											<button className='btn btn-success'>Scores</button>
										</Link>
									</td>
								</tr>
							</tbody>
						))}
					</table>
				</div>
			</div>
		);
	}
}

export default withRouter(AdminExams);
