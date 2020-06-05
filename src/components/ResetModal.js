import React, { Component } from "react";
import UserContext from "../UserContext";

export class ResetModal extends Component {
	static contextType = UserContext;

	render() {
		const generatedPwd = this.context.generatedPwd;
		console.log(this.props.id);
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
									{generatedPwd && (
										<p className='alert alert-success'>
											New Password: {generatedPwd}
										</p>
									)}
									{!generatedPwd && (
										<h5>
											Are you sure you want to reset the password of this user ?
										</h5>
									)}
								</div>
							</div>
							<div className='modal-footer'>
								{!generatedPwd && (
									<div>
										<button
											type='button'
											className='btn btn-primary mr-2'
											onClick={() =>
												this.context.handleResetPWD(this.props.id)
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
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ResetModal;
