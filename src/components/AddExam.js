import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import ExamContext from "../ExamContext";

export class AddExam extends Component {
	static contextType = ExamContext;
	state = {
		title: "",
		question: "First Question",
		qcm: { questions: [] },
		startDate: new Date(),
		durationMin: 0,
		request: "",
		err: "",

		addedQuestion: "",
	};

	handleAddExam = () => {
		let { title, durationMin } = this.state;

		if (!durationMin) {
			this.setState({
				...this.state,
				err: "Please fill duration field",
				request: "fail",
			});
			setTimeout(() => {
				this.setState({
					...this.state,
					err: "",
					request: "",
				});
			}, 3000);
		}

		if (!title) {
			this.setState({
				...this.state,
				err: "Please fill title field",
				request: "fail",
			});
			setTimeout(() => {
				this.setState({
					...this.state,
					err: "",
					request: "",
				});
			}, 3000);
		}
		if ((title, durationMin)) {
			this.context.handleAddExam(this.props.courseId, {
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
			});
		}
	};

	render() {
		return (
			<div
				className='modal'
				tabIndex='-1'
				role='dialog'
				id='addExamModal'
				data-backdrop='static'>
				<div className='modal-dialog modal-dialog-centered' role='document'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h4 className='modal-title'>Add Exam</h4>
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								aria-label='Close'>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						<div className='modal-body'>
							<div className='form-group'>
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
								<h5>Duration (min):</h5>
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
								<h5>Date & Time:</h5>
								<div>
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
								</div>
							</div>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-primary'
								onClick={this.handleAddExam}>
								Create
							</button>
							<button
								type='button'
								className='btn btn-secondary'
								data-dismiss='modal'>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddExam;
