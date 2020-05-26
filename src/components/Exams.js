import React, { Component } from "react";
import ExamsCard from "./ExamsCard";
import axios from "axios";
import jwt_decode from "jwt-decode";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Timer from "./Timer";
import moment from "moment";

export class Exams extends Component {
	state = {
		exam: [],
		isStudent:
			localStorage.getItem("token") !== null &&
			jwt_decode(localStorage.token).roles[0] === "STUDENT",
		isEditing: false,
		title: "",
		durationMin: 0,
		addedQuestion: "",
		startDate: new Date(),
		grabedAnswers: [],
		isDone: false,
		score: 0,
		editedData: {},
	};

	getExamById = () => {
		axios({
			url: `http://91.134.133.143:9090/api/v1/exams/${this.props.match.params.id}`,
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					exam: res.data.payload,
					durationMin: res.data.payload.durationMin,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	startExam = () => {
		axios({
			url: `http://91.134.133.143:9090/api/v1/exams/${this.props.match.params.id}/start-assessment`,
			method: "put",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					exam: res.data.payload.exam,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleEditExam = () => {
		if (this.state.editedData) {
			axios({
				url: `http://91.134.133.143:9090/api/v1/exams/${this.props.match.params.id}`,
				method: "put",
				headers: { authorization: localStorage.getItem("token") },
				data: this.state.editedData,
			})
				// .then(window.location.reload(false))
				.catch((err) => {
					console.log(err);
				});
		}
	};
	handleAddQ = () => {
		axios({
			url: `http://91.134.133.143:9090/api/v1/exams/${this.props.match.params.id}/questions`,
			method: "post",
			headers: { authorization: localStorage.getItem("token") },
			data: [
				{
					answers: [{}],
					statement: this.state.addedQuestion,
				},
			],
		})
			.then(window.location.reload(false))
			.catch((err) => {
				console.log(err);
			});
	};

	grabAnswer = (grabedAnswers) => {
		this.setState({
			grabedAnswers: [...this.state.grabedAnswers, grabedAnswers],
		});
	};
	calculateScore = () => {
		// let answers = this.state.grabedAnswers.filter((el) => el.checked);
		let answers = this.state.grabedAnswers;

		for (let i = 0; i < answers.length; i++) {
			for (let j = 0; j < answers.length; j++) {
				if (i !== j) {
					if (answers[i].id === answers[j].id) {
						if (answers[i].date > answers[j].date) {
							answers[j] = {};
						} else answers[i] = {};
					}
				}
			}
		}
		// filter checked answers
		let filtered = answers.filter((el) => el.checked);
		// calculating scrore
		let result =
			(filtered.filter((el) => el.correct).length -
				filtered.filter((el) => !el.correct).length) /
			this.state.exam.questions.map((el) => el.answers.find((el) => el.correct))
				.length;
		result = result * 100;
		this.setState({
			...this.state,
			score: result < 0 ? 0 : result,
			isDone: true,
		});
		// sending score
		this.sendScore(result);
	};

	sendScore = (score) => {
		axios({
			url: `http://91.134.133.143:9090/api/v1/exams/${this.props.match.params.id}/submit-assessment`,
			method: "put",
			headers: { authorization: localStorage.getItem("token") },
			data: {
				score: score,
				status: score < 50 ? "FAILED" : "SUCCEEDED",
			},
		})
			.then()
			.catch((err) => {
				console.log(err);
			});
	};
	componentDidMount() {
		this.state.isStudent ? this.startExam() : this.getExamById();
		// let score = this.state.score;

		// setTimeout(() => {
		// 	this.sendScore(this.state.score);
		// }, this.state.exam.durationMin * 60000);
	}
	render() {
		return (
			<div className='exam mt-5'>
				<div className='container'>
					<div className='center title'>
						{this.state.isEditing ? (
							<div className='d-flex align-items-center mb-3'>
								<h5>Exam title:</h5>
								<input
									className='form-control w-50 ml-3'
									defaultValue={this.state.exam.title}
									type='text'
									onChange={(e) =>
										this.setState({
											...this.state,
											editedData: {
												...this.state.editedData,
												title: e.target.value,
											},
										})
									}
								/>
							</div>
						) : (
							<h4>{this.state.exam.title}</h4>
						)}
					</div>
					<div className='center'>
						{this.state.isEditing ? (
							<div className='d-flex align-items-center mb-3'>
								<h6>Exam Duration:</h6>
								<input
									className='form-control w-50 ml-3'
									defaultValue={this.state.exam.durationMin}
									type='text'
									onChange={(e) =>
										this.setState({
											...this.state,
											editedData: {
												...this.state.editedData,
												durationMin: Number(e.target.value),
											},
										})
									}
								/>
							</div>
						) : (
							<h6>Exam duration: {this.state.exam.durationMin}min</h6>
						)}
					</div>
					{this.state.isEditing ? (
						<div className='d-flex align-items-center mb-3'>
							<h6 className='mr-3'>Exam Date:</h6>
							<DatePicker
								selected={this.state.startDate}
								onChange={(date) =>
									this.setState({
										...this.state,
										editedData: {
											...this.state.editedData,
											startDate: moment(date).format("YYYY-MM-DD HH:mm:ss"),
										},
									})
								}
								showTimeSelect
								timeFormat='HH:mm'
								timeIntervals={15}
								timeCaption='time'
								dateFormat='MMMM d, yyyy h:mm aa'
							/>
						</div>
					) : (
						<h6 className='center'>Exam starts: {this.state.exam.startDate}</h6>
					)}
				</div>
				{!this.state.isStudent && (
					<i
						type='button'
						className={
							this.state.isEditing
								? "fa fa-times btn btn-outline-danger ml-2"
								: "fa fa-cog btn btn-outline-dark ml-2"
						}
						aria-hidden='true'
						onClick={() =>
							this.setState({
								isEditing: !this.state.isEditing,
							})
						}
					/>
				)}

				{this.state.isEditing && (
					<i
						type='button'
						className='fa fa-floppy-o btn btn-outline-success ml-2'
						aria-hidden='true'
						onClick={this.handleEditExam}
					/>
				)}
				{!this.state.isStudent && (
					<div className='mt-5 ml-5'>
						<h5>Add Question:</h5>
						<div className='d-flex align-items-center mb-3'>
							<input
								className='form-control w-50 mr-2'
								placeholder='question'
								type='text'
								onChange={(e) =>
									this.setState({
										...this.state,
										addedQuestion: e.target.value,
									})
								}
							/>
							<button className='btn btn-primary' onClick={this.handleAddQ}>
								Add Question
							</button>
						</div>
					</div>
				)}
				{/* {this.state.isStudent && (
					<Timer
						durationMin={
							this.state.exam.durationMin && this.state.exam.durationMin
						}
					/>
				)} */}
				<button
					className='btn btn-primary ml-5 mt-5'
					onClick={() => this.props.history.goBack()}>
					Go Back
				</button>
				{this.state.exam.questions &&
					this.state.exam.questions.map((el) => (
						<ExamsCard
							exam={el}
							key={el.id}
							isStudent={this.state.isStudent}
							grabAnswer={this.grabAnswer}
						/>
					))}
				{this.state.isStudent &&
					(this.state.isDone ? (
						<h2 className='center'>
							Score: {this.state.score}%{" "}
							{this.state.score > 0 ? "Succeded" : "Failed"}
						</h2>
					) : (
						<button
							className='btn btn-primary godown mb-5'
							onClick={this.calculateScore}>
							Submit
						</button>
					))}
			</div>
		);
	}
}

export default Exams;
