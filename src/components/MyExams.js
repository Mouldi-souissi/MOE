import React, { Component } from "react";
import ThemeContext from "../ThemeContext";
import { Link } from "react-router-dom";
import moment from "moment";

export class MyExams extends Component {
	static contextType = ThemeContext;
	componentDidMount() {
		this.context.getUserExams();
	}
	render() {
		const exmas = this.context.userExams;
		return (
			<div>
				<div className='scores mr-5 ml-5'>
					<h4 className='center mb-3'>Exams:</h4>
					<table className='table table-striped'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Title</th>
								<th scope='col'>Duration</th>
								<th scope='col'>Start Date</th>
								<th scope='col'>Status</th>
							</tr>
						</thead>
						{exmas.map((exam, i) => (
							<tbody key={i}>
								<tr>
									<th scope='row'>{i + 1}</th>

									<td>
										{moment(exam.startDate) < moment(new Date()) ? (
											<Link to={`/scores${exam.id}`}>{exam.title}</Link>
										) : (
											<Link to={`/exam${exam.id}`}>{exam.title}</Link>
										)}
									</td>

									<td>{exam.durationMin}</td>
									<td>{exam.startDate}</td>
									<td>
										{moment(exam.startDate) < moment(new Date())
											? "Finished"
											: "Upcoming"}
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
