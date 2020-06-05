import React, { Component } from "react";
import ThemeContext from "../ThemeContext";
import { Link } from "react-router-dom";
import moment from "moment";
import jwt_decode from "jwt-decode";

export class MyExams extends Component {
	static contextType = ThemeContext;
	state = {
		isStudent:
			localStorage.getItem("token") !== null &&
			jwt_decode(localStorage.token).roles[0] === "STUDENT",
	};

	// getScore = () => {
	// 	axios({
	// 		url: `https://app.visioconf.site/api/v1/exams/${this.props.match.params.id}/assessments`,
	// 		method: "get",
	// 		headers: { authorization: localStorage.getItem("token") },
	// 	})
	// 		.then((res) => this.setState({ score: res.data.payload }))
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };
	componentDidMount() {
		this.context.getUserExams();
	}
	render() {
		const exams = this.context.userExams;

		return (
			<div>
				<div className='myExams mr-5 ml-5'>
					<h4 className='center mb-3'>Exams:</h4>
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
									<td>
										<Link to={`/exam${exam.id}`}>{exam.title}</Link>
									</td>

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

export default MyExams;
