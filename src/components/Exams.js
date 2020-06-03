import React, { Component } from "react";
import ExamsCard from "./ExamsCard";
import jwt_decode from "jwt-decode";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import ExamContext from "../ExamContext";

export class Exams extends Component {
	static contextType = ExamContext;
	constructor() {
		super();
		this.state = {
			isStudent:
				localStorage.getItem("token") !== null &&
				jwt_decode(localStorage.token).roles[0] === "STUDENT",
			isEditing: false,
			title: "",
			durationMin: 0,
			addedQuestion: "",
			startDate: new Date(),
			grabedAnswers: [],
			editedData: {},
			time: 0,
			start: false,
			hr: 0,
			min: 0,
			sec: 0,
			ms: 0,
		};
		let setI = setInterval(() => {
			if (this.state.start)
				this.setState({
					ms: this.state.ms - 1000,
				});
			this.converter();
			if (this.state.ms < 0) {
				this.setState({ start: false });
				clearInterval(setI);
				this.context.calculateAndSendScore(
					this.state.grabedAnswers,
					this.props.match.params.id
				);
			}
		}, 1000);
	}

	handleEditExam = () => {
		this.context.handleEditExam(
			this.state.editedData,
			this.props.match.params.id
		);
		this.setState({ isEditing: false });
	};

	grabAnswer = (grabedAnswers) => {
		this.setState({
			grabedAnswers: [...this.state.grabedAnswers, grabedAnswers],
		});
	};

	timer = () => {
		let todaysDate = moment(new Date());
		let endDate = moment(this.context.exam.startDate).add(
			this.context.exam.durationMin,
			"minutes"
		);
		let d = moment
			.duration(moment(endDate).diff(moment(todaysDate)))
			.asMilliseconds();

		d > 0 && this.setState({ start: true, ms: d });
	};

	converter = () => {
		this.setState({
			hr: parseInt(this.state.ms / 3600000),
			min: parseInt((this.state.ms % 3600000) / 60000),
			sec: parseInt(((this.state.ms % 3600000) % 60000) / 1000),
		});
	};

	componentDidMount() {
		this.state.isStudent
			? this.context.startExam(this.props.match.params.id)
			: this.context.getExamById(this.props.match.params.id);
	}
	render() {
		const exam = this.context.exam;
		const score = this.context.score;
		const isDone = this.context.isDone;

		let todaysDate = moment(new Date());
		let startDate = exam.startDate;
		let endDate = moment(exam.startDate).add(exam.durationMin, "minutes");
		var isbetween = moment(todaysDate).isBetween(startDate, endDate);

		return (
			<div className='exam mt-5'>
				<div className='container'>
					<div className='center title'>
						{this.state.isEditing ? (
							<div className='d-flex align-items-center mb-3'>
								<h5>Exam title:</h5>
								<input
									className='form-control w-50 ml-3'
									defaultValue={exam.title}
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
							<h4>{exam.title}</h4>
						)}
					</div>

					<div className='center'>
						{this.state.isEditing ? (
							<div className='d-flex align-items-center mb-3'>
								<h6>Exam Duration:</h6>
								<input
									className='form-control w-50 ml-3'
									defaultValue={exam.durationMin}
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
							<h6>Exam duration: {exam.durationMin}min</h6>
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
						<h6 className='center'>
							Exam Date: {exam.startDate && moment(exam.startDate).calendar()}
						</h6>
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
							<button
								className='btn btn-primary'
								onClick={() =>
									this.context.handleAddQ(
										this.props.match.params.id,
										this.state.addedQuestion
									)
								}>
								Add Question
							</button>
						</div>
					</div>
				)}
				<div className='d-flex'>
					<button
						className='btn btn-primary ml-5 mr-2'
						onClick={() => this.props.history.goBack()}>
						Go Back
					</button>
					{this.state.isStudent && !this.state.start && (
						<button
							className={
								isbetween ? "btn btn-warning" : "btn btn-warning disabled"
							}
							onClick={isbetween ? this.timer : undefined}>
							Start Exam
						</button>
					)}
				</div>
				{this.state.isStudent && this.state.start && (
					<div className='timer center'>
						<p>
							{String(this.state.hr).padStart(2, "0")}:
							{String(this.state.min).padStart(2, "0")}:
							{String(this.state.sec).padStart(2, "0")}
						</p>
					</div>
				)}
				{exam.questions &&
					this.state.start &&
					exam.questions.map((el) => (
						<ExamsCard
							exam={el}
							key={el.id}
							isStudent={this.state.isStudent}
							grabAnswer={this.grabAnswer}
						/>
					))}
				{exam.questions &&
					!this.state.isStudent &&
					exam.questions.map((el) => (
						<ExamsCard
							exam={el}
							key={el.id}
							isStudent={this.state.isStudent}
							grabAnswer={this.grabAnswer}
						/>
					))}
				{this.state.isStudent &&
					(isDone ? (
						<h2 className='center mb-5 mt-5'>
							Score: {score}% {score > 0 ? "Succeded" : "Failed"}
						</h2>
					) : (
						this.state.start && (
							<button
								className='btn btn-primary godown mb-5 mt-5'
								onClick={() =>
									this.context.calculateAndSendScore(
										this.state.grabedAnswers,
										this.props.match.params.id
									)
								}>
								Submit
							</button>
						)
					))}
			</div>
		);
	}
}

export default Exams;
