import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ExamContext from "../ExamContext";
import ExamsAnswerCard from "./ExamsAnswerCard";
import { v4 as uuidv4 } from "uuid";

export class ExamsCard extends Component {
	static contextType = ExamContext;
	state = {
		question: "",
		answer: "",
		answerType: false,
		isEditing: false,
	};

	handleEditQuestion = () => {
		this.context.handleEditQuestion(
			this.props.exam.id,
			this.state.question,
			this.props.match.params.id
		);
		this.setState({ ...this.state, isEditing: false });
	};

	handleChecked = (e) => {
		this.props.grabAnswer({
			checked: e.target.checked,
			correct: e.target.value === "true" ? true : false,
			id: e.target.id,
			date: Date.now(),
		});
	};

	render() {
		return (
			<div>
				<div className='container pt-5'>
					<div id='game' className='justify-center flex-column mb-5'>
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
													...this.state,
													question: e.target.value,
												})
											}
										/>
									</div>
								) : (
									<h5 className=''>
										Question {this.props.order}: {this.props.exam.statement}
									</h5>
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
												...this.state,
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
											onClick={() =>
												this.context.handleDeleteQuestion(
													this.props.exam.id,
													this.props.match.params.id
												)
											}
										/>
									</div>
								)}
							</div>
						</div>
						{this.props.exam.answers &&
							this.props.exam.answers
								.sort((a, b) => a.id - b.id)
								.map((answer, i) => (
									<ExamsAnswerCard
										key={answer.id}
										answer={answer}
										i={i + 1}
										isStudent={this.props.isStudent}
										handleChecked={this.handleChecked}
									/>
								))}
						{!this.props.isStudent && (
							<div className='d-flex align-items-center mb-3'>
								<h5 className='mr-3'>Add Answer</h5>
								<input
									className='form-control w-50 mr-2'
									type='text'
									onChange={(e) =>
										this.setState({
											...this.state,
											answer: e.target.value,
										})
									}
								/>
								<button
									className='btn btn-primary mr-3'
									onClick={() =>
										this.context.handleAddA(
											this.props.exam.id,
											this.state.answer,
											this.state.answerType,
											this.props.match.params.id
										)
									}>
									Add Answer
								</button>
								<div
									className='d-flex mt-1'
									onChange={(e) =>
										this.setState({
											...this.state,
											answerType: e.target.value,
										})
									}>
									<div>
										<input
											className='mr-2'
											type='radio'
											// id={this.props.order}
											id={uuidv4()}
											name={this.props.exam.statement}
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
											id={uuidv4()}
											name={this.props.exam.statement}
											value='true'
											className='mr-2'
										/>
										<label htmlFor='pdf'>Correct</label>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(ExamsCard);
