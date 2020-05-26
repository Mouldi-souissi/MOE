import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

export class ExamsCard extends Component {
	state = {
		question: "",
		answer: "",
		answerType: false,
		isEditingAnswer: false,
		editedAnswer: "",
		editedType: false,
		blocScore: 0,
		checked: false,
		checkedAnswers: [],
		// date: new date(),
	};

	handleEditQuestion = () => {
		axios({
			url: `http://91.134.133.143:9090/api/v1/questions/${this.props.exam.id}`,
			method: "put",
			headers: { authorization: localStorage.getItem("token") },
			data: { statement: this.state.question },
		})
			.then(window.location.reload(false))
			.catch((err) => {
				console.log(err);
			});
	};

	handleAddA = () => {
		axios({
			url: `http://91.134.133.143:9090/api/v1/questions/${this.props.exam.id}/answers`,
			method: "post",
			headers: { authorization: localStorage.getItem("token") },
			data: [{ text: this.state.answer, correct: this.state.answerType }],
		})
			.then(window.location.reload(false))
			.catch((err) => {
				console.log(err);
			});
	};
	handleDeleteQuestion = () => {
		axios({
			url: `http://91.134.133.143:9090/api/v1/questions/${this.props.exam.id}`,
			method: "delete",
			headers: { authorization: localStorage.getItem("token") },
			data: [{ text: this.state.answer, correct: this.state.answerType }],
		})
			.then(window.location.reload(false))
			.catch((err) => {
				console.log(err);
			});
	};
	handleEditAnswer = (id) => {
		axios({
			url: `http://91.134.133.143:9090/api/v1/answers/${id}`,
			method: "put",
			headers: { authorization: localStorage.getItem("token") },
			data: { text: this.state.editedAnswer, correct: this.state.editedType },
		})
			.then(window.location.reload(false))
			.catch((err) => {
				console.log(err);
			});
	};
	handleDeleteAnswer = (id) => {
		axios({
			url: `http://91.134.133.143:9090/api/v1/answers/${id}`,
			method: "delete",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then(window.location.reload(false))
			.catch((err) => {
				console.log(err);
			});
	};

	handleChecked = (e) => {
		this.setState({
			// checked: e.target.checked,
			checkedAnswers: [
				...this.state.checkedAnswers,
				{ checked: e.target.checked, correct: e.target.value, id: e.target.id },
			],
		});

		this.props.grabAnswer({
			checked: e.target.checked,
			correct: e.target.value === "true" ? true : false,
			id: e.target.id,
			date: Date.now(),
			// idQ: this.props.exam.id,
		});
	};

	render() {
		return (
			<div>
				<div className='container pt-5'>
					<div id='game' className='justify-center flex-column'>
						<div className='form-group'>
							<div id='hud-item ' className='d-flex align-items-center mb-2'>
								{this.state.isEditing ? (
									<div className='d-flex align-items-center mb-2'>
										<h5 className='mr-3'>Edit Question:</h5>
										<input
											className='form-control w-50'
											type='text'
											defaultValue={this.props.exam.statement}
											onChange={(e) =>
												this.setState({
													question: e.target.value,
												})
											}
										/>
									</div>
								) : (
									<h5 className=''>Question: {this.props.exam.statement}</h5>
								)}

								{!this.props.isStudent && (
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
									<div>
										<i
											type='button'
											className='fa fa-floppy-o btn btn-outline-success ml-2'
											aria-hidden='true'
											onClick={this.handleEditQuestion}
										/>
										<i
											type='button'
											className='fa fa-trash btn btn-danger ml-2'
											aria-hidden='true'
											onClick={this.handleDeleteQuestion}
										/>
									</div>
								)}
							</div>
							{!this.props.isStudent && (
								<div className='d-flex align-items-center mb-3'>
									<input
										className='form-control w-50 mr-2'
										type='text'
										onChange={(e) =>
											this.setState({
												answer: e.target.value,
											})
										}
									/>
									<button
										className='btn btn-primary mr-3'
										onClick={this.handleAddA}>
										Add Answer
									</button>
									<div
										className='d-flex mt-1'
										onChange={(e) =>
											this.setState({ answerType: e.target.value })
										}>
										<div>
											<input
												className='mr-2'
												type='radio'
												id='huey'
												name='drone'
												value='false'
												defaultChecked
											/>
											<label htmlFor='doc' className='mr-3'>
												Wrong
											</label>
										</div>

										<div>
											<input
												type='radio'
												id='dewey'
												name='drone'
												value='true'
												className='mr-2'
											/>
											<label htmlFor='pdf'>Correct</label>
										</div>
									</div>
								</div>
							)}
						</div>
						{/* {this.props.exam.answers.map((el, i) => (
							<div className='choice-container' key={el.id}>
								<div className='choice-prefix'>{i + 1}</div>
								<div className='choice-text'>{el.text}</div>
								<div className='form-check'>
									<input
										className='form-check-input'
										type='checkbox'
										value=''
										id='defaultCheck1'
									/>
								</div>
							</div>
						))} */}
						{this.props.exam.answers &&
							this.props.exam.answers.map((el, i) => (
								<div className='choice-container' key={i}>
									{!this.props.isStudent && (
										<i
											type='button'
											className={
												this.state.isEditingAnswer
													? "fa fa-times btn btn-outline-danger h-50 mr-3 ml-3 mt-3"
													: "fa fa-cog btn btn-outline-dark h-50 mr-3 ml-3 mt-3"
											}
											aria-hidden='true'
											onClick={() =>
												this.setState({
													isEditingAnswer: !this.state.isEditingAnswer,
												})
											}
										/>
									)}

									{this.state.isEditingAnswer && (
										<div>
											<i
												type='button'
												className='fa fa-floppy-o btn btn-outline-success h-50 mt-3 mr-3'
												aria-hidden='true'
												onClick={() => this.handleEditAnswer(el.id)}
											/>
											<i
												type='button'
												className='fa fa-trash btn btn-danger mt-3 mr-3'
												aria-hidden='true'
												onClick={() => this.handleDeleteAnswer(el.id)}
											/>
										</div>
									)}
									<div className='choice-prefix'>{i + 1}</div>
									{this.state.isEditingAnswer ? (
										<div className='d-flex align-items-center'>
											<input
												className='form-control ml-3'
												type='text'
												defaultValue={el.text}
												onChange={(e) =>
													this.setState({
														editedAnswer: e.target.value,
														answerdId: i,
													})
												}
											/>
											<div
												className='d-flex ml-5'
												onChange={(e) =>
													this.setState({ editedType: e.target.value })
												}>
												<div className='d-flex align-items-center'>
													<input
														className='mr-2'
														type='radio'
														id={i}
														name={i}
														value='false'
														defaultChecked
													/>
													<label htmlFor='doc' className='mr-3'>
														Wrong
													</label>
												</div>

												<div className='d-flex align-items-center'>
													<input
														className='mr-2'
														type='radio'
														id={i}
														name={i}
														value='true'
													/>
													<label htmlFor='pdf'>Correct</label>
												</div>
											</div>
										</div>
									) : (
										<div className='choice-text'>{el.text}</div>
									)}
									{!this.state.isEditingAnswer && (
										<div className='form-check'>
											<input
												className='form-check-input'
												type='checkbox'
												value={el.correct}
												id={el.id}
												defaultChecked={this.state.checked}
												onClick={(e) => this.handleChecked(e)}
											/>
										</div>
									)}
								</div>
							))}
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(ExamsCard);
