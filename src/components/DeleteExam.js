import React, { Component } from "react";
import ExamContext from "../ExamContext";

export class DeleteExam extends Component {
	static contextType = ExamContext;

	render() {
		return (
			<div>
				<div
					className='modal'
					tabIndex='-1'
					role='dialog'
					id='deleteExam'
					data-backdrop='static'>
					<div className='modal-dialog modal-dialog-centered' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
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
									<h5>Are you sure you want to delete this exam ?</h5>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-primary'
									data-dismiss='modal'
									onClick={() =>
										this.context.deleteExam(this.props.id, this.props.courseId)
									}>
									Yes
								</button>
								<button
									type='button'
									className='btn btn-secondary'
									data-dismiss='modal'>
									No
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DeleteExam;
