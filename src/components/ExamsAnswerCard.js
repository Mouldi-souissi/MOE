import React, { Component } from "react";
import ExamContext from "../ExamContext";
import { withRouter } from "react-router-dom";

export class ExamsAnswerCard extends Component {
	static contextType = ExamContext;
	state = {
		isEditingAnswer: false,
		editedAnswer: "",
		checked: false,
		editedType: false,
	};

	handleEditAnswer = (id, defaultA) => {
		this.context.handleEditAnswer(
			id,
			!this.state.editedAnswer ? defaultA : this.state.editedAnswer,
			this.state.editedType,
			this.props.match.params.id
		);
		this.setState({ ...this.state, isEditingAnswer: false });
	};
	render() {
		let { answer, isStudent, i } = this.props;
		return (
			<div className='choice-container'>
				{!isStudent && (
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
								...this.state,
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
							onClick={() => this.handleEditAnswer(answer.id, answer.text)}
						/>
						<i
							type='button'
							className='fa fa-trash btn btn-danger mt-3 mr-3'
							aria-hidden='true'
							onClick={() =>
								this.context.handleDeleteAnswer(
									answer.id,
									this.props.match.params.id
								)
							}
						/>
					</div>
				)}
				<div className='choice-prefix'>{i}</div>
				{this.state.isEditingAnswer ? (
					<div className='d-flex align-items-center'>
						<input
							className='form-control ml-3'
							type='text'
							defaultValue={answer.text}
							onChange={(e) =>
								this.setState({
									...this.state,
									editedAnswer: e.target.value,
									answerdId: i,
								})
							}
						/>
						<div
							className='d-flex ml-5'
							onChange={(e) =>
								this.setState({
									...this.state,
									editedType: e.target.value,
								})
							}>
							<div className='d-flex align-items-center'>
								<input
									className='mr-2'
									type='radio'
									id={i}
									name={i}
									value='false'
									defaultChecked={!answer.correct ? "checked" : ""}
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
									defaultChecked={answer.correct ? "checked" : ""}
								/>
								<label htmlFor='pdf'>Correct</label>
							</div>
						</div>
					</div>
				) : (
					<div className='choice-text'>{answer.text}</div>
				)}
				{!this.state.isEditingAnswer && (
					<div className='form-check'>
						<input
							className='form-check-input'
							type='checkbox'
							value={answer.correct}
							id={answer.id}
							defaultChecked={this.state.checked}
							onClick={(e) => this.props.handleChecked(e)}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default withRouter(ExamsAnswerCard);
