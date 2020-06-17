import React, { Component } from "react";
import axios from "axios";
import Score from "./Score";

export class ScoreList extends Component {
	state = {
		score: [],
	};

	getScore = () => {
		axios({
			url: `https://app.visioconf.site/api/v1/exams/${this.props.match.params.id}/assessments`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => this.setState({ score: res.data.payload }))
			.catch((err) => {
				console.log(err);
			});
	};
	componentDidMount() {
		this.getScore();
	}
	render() {
		return (
			<div className='scores mr-5 ml-5'>
				<button
					className='btn btn-primary ml-5'
					onClick={() => this.props.history.goBack()}>
					Go Back
				</button>
				<h4 className='center mb-3'>Scores:</h4>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>First</th>
							<th scope='col'>Last</th>
							<th scope='col'>Score</th>
							<th scope='col'>Status</th>
							<th scope='col'>Date</th>
						</tr>
					</thead>
					{this.state.score &&
						this.state.score.map((score, i) => (
							<Score key={i} score={score} i={i + 1} />
						))}
				</table>
			</div>
		);
	}
}

export default ScoreList;
