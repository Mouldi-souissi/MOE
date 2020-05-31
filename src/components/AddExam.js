import React, { Component } from "react";
import AddExamCard from "./AddExamCard";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export class AddExam extends Component {
	state = {
		title: "",
		question: "",
		qcm: { questions: [] },
		startDate: new Date(),
		durationMin: 0,
		request: "",
		err: "",
	};

	handleAddQ = () => {
		let { title, durationMin, startDate, question } = this.state;
		if (!question)
			this.setState({
				...this.state,
				err: "Please fill question field",
				request: "fail",
			});
		if (!startDate)
			this.setState({
				...this.state,
				err: "Please fill start Date field",
				request: "fail",
			});
		if (!durationMin)
			this.setState({
				...this.state,
				err: "Please fill duration field",
				request: "fail",
			});
		if (!title)
			this.setState({
				...this.state,
				err: "Please fill title field",
				request: "fail",
			});
		durationMin &&
			title &&
			startDate &&
			question &&
			this.setState({
				...this.state,

				qcm: {
					durationMin: this.state.durationMin,
					questions: [
						...this.state.qcm.questions,
						{
							answers: [],
							statement: this.state.question,
						},
					],
					title: this.state.title,
					startDate: moment(this.state.startDate).format("YYYY-MM-DD HH:mm:ss"),
				},
			});
		this.timeout = setTimeout(() => {
			this.setState({ err: "", request: "" });
		}, 5000);
	};
	addAnswer = (answer, statement, answerType) => {
		if (!answer)
			this.setState({
				...this.state,
				err: "Please fill answer field",
				request: "fail",
			});
		if (answer) {
			let result =
				this.state.qcm &&
				this.state.qcm.questions.find((el) => el.statement === statement);
			result.answers = [
				...result.answers,
				{ text: answer, correct: answerType },
			];
			this.timeout = setTimeout(() => {
				this.setState({ err: "", request: "" });
			}, 5000);
		}
	};

	handleEditQuestion = (question, previousQuestion) => {
		let result = this.state.qcm.questions.find(
			(el) => el.statement === previousQuestion
		);
		result.statement = question;
		this.setState({});
	};

	handleEditAnswer = (answer, question, id, correct) => {
		let result = this.state.qcm.questions.find(
			(el) => el.statement === question
		);

		result.answers[id] = { text: answer, correct: correct };
		this.setState({});
	};

	handleDeleteQuestion = (question) => {
		let result = this.state.qcm.questions.find(
			(el) => el.statement === question
		);

		delete result.statement;
		delete result.answers;

		this.setState({
			qcm: {
				...this.state.qcm,
				questions: this.state.qcm.questions.filter((el) => el.statement),
			},
		});
	};

	handleDeleteAnswer = (question, answerId) => {
		let result = this.state.qcm.questions.find(
			(el) => el.statement === question
		);
		result.answers[answerId] = null;

		this.setState({});
	};

	handleAddExam = () => {
		axios({
			url: `https://app.visioconf.site/api/v1/courses/${this.props.match.params.id}/exams`,
			method: "post",
			headers: { authorization: localStorage.getItem("token") },
			data: this.state.qcm,
		})
			.then((res) => {
				window.location.href = `/exam${res.data.payload.id}`;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<div className='login-clean'>
				<div className='container'>
					{this.state.request && (
						<p
							className={
								this.state.request === "fail"
									? "alert alert-danger"
									: "alert alert-success"
							}>
							{this.state.err}
						</p>
					)}
					<h5>Exam title:</h5>
					<input
						className='form-control w-50 mb-3'
						placeholder='title'
						type='text'
						onChange={(e) =>
							this.setState({ ...this.state, title: e.target.value })
						}
					/>
					<h5>Exam Duration (min):</h5>
					<input
						className='form-control w-50 mb-3'
						placeholder='Duration'
						type='text'
						onChange={(e) =>
							this.setState({
								...this.state,
								durationMin: Number(e.target.value),
							})
						}
					/>
					<h5>Time:</h5>
					<DatePicker
						selected={this.state.startDate}
						onChange={(date) =>
							this.setState({ ...this.state, startDate: date })
						}
						showTimeSelect
						timeFormat='HH:mm:ss'
						timeIntervals={15}
						timeCaption='time'
						dateFormat='MMMM d, yyyy h:mm aa'
					/>
					<h5 className='mt-3'>Exam question:</h5>
					<input
						className='form-control w-50'
						placeholder='question'
						type='text'
						onChange={(e) =>
							this.setState({ ...this.state, question: e.target.value })
						}
					/>
					<button className='btn btn-primary mt-3' onClick={this.handleAddQ}>
						Add Question
					</button>
					<button
						className='btn btn-primary mt-3 ml-3'
						onClick={this.handleAddExam}>
						Save Exam
					</button>
				</div>
				{this.state.qcm.questions &&
					this.state.qcm.questions.map((el) => (
						<AddExamCard
							key={el.statement}
							question={el}
							addAnswer={this.addAnswer}
							handleEditQuestion={this.handleEditQuestion}
							handleEditAnswer={this.handleEditAnswer}
							handleDeleteQuestion={this.handleDeleteQuestion}
							handleDeleteAnswer={this.handleDeleteAnswer}
						/>
					))}
			</div>
		);
	}
}

export default AddExam;
