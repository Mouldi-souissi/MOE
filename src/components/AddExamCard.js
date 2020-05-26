import React, { Component } from "react";

export class AddExamCard extends Component {
	state = {
		answer: "",
		answerType: false,
		isEditing: false,
		question: "",
		isEditingAnswer: false,
		editedAnswer: "",
		editedType: false,
		answerdId: 0,
	};
	handleAddA = () => {
		this.props.addAnswer(
			this.state.answer,
			this.props.question.statement,
			this.state.answerType
		);
		this.setState({});
	};
	handleDeleteQuestion = () => {
		this.props.handleDeleteQuestion(this.props.question.statement);
	};

	// componentWillReceiveProps({ question }) {
	// 	this.setState({ ...this.state, question });
	// }

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
											defaultValue={this.props.question.statement}
											onChange={(e) =>
												this.setState({
													question: e.target.value,
												})
											}
										/>
									</div>
								) : (
									<h5 className=''>
										Question: {this.props.question.statement}
									</h5>
								)}

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
								{this.state.isEditing && (
									<div>
										<i
											type='button'
											className='fa fa-floppy-o btn btn-outline-success ml-2'
											aria-hidden='true'
											onClick={() =>
												this.props.handleEditQuestion(
													this.state.question,
													this.props.question.statement
												)
											}
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

							{this.props.question.answers &&
								this.props.question.answers
									.filter((el) => el !== null)
									.map((el, i) => (
										<div className='choice-container' key={i}>
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
											{this.state.isEditingAnswer && (
												<div>
													<i
														type='button'
														className='fa fa-floppy-o btn btn-outline-success h-50 mt-3 mr-3'
														aria-hidden='true'
														onClick={() =>
															this.props.handleEditAnswer(
																this.state.editedAnswer,
																this.props.question.statement,
																this.state.answerdId,
																this.state.editedType
															)
														}
													/>
													<i
														type='button'
														className='fa fa-trash btn btn-danger mt-3 mr-3'
														aria-hidden='true'
														onClick={() =>
															this.props.handleDeleteAnswer(
																this.props.question.statement,
																i
															)
														}
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
										</div>
									))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddExamCard;
