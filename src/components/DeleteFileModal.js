import React, { Component } from "react";
import CourseContext from "../CourseContext";

export class SessionModal extends Component {
	static contextType = CourseContext;

	render() {
		return (
			<div>
				<div
					className='modal'
					tabIndex='-1'
					role='dialog'
					id={this.props.id}
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
									<h5>Are you sure you want to delete this file ?</h5>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-primary'
									data-dismiss='modal'
									onClick={() =>
										this.context.handleDeleteFiles(
											this.props.id,
											this.props.idCourse
										)
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

export default SessionModal;
