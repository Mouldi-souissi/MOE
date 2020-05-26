import React, { Component } from "react";

export class SessionModal extends Component {
	state = {
		autoStartRecording: "No",
	};
	render() {
		return (
			<div>
				<div
					className='modal'
					tabIndex='-1'
					role='dialog'
					id='SessionModal'
					data-backdrop='static'>
					<div className='modal-dialog modal-dialog-centered' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h4 className='modal-title'>Create Session</h4>
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
									<h5>Start Auto Recording</h5>
									<select
										className='form-control'
										id='record'
										defaultValue={this.state.autoStartRecording}
										name='record'
										onChange={(e) =>
											this.setState({ autoStartRecording: e.target.value })
										}>
										<option>No</option>
										<option>Yes</option>
									</select>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-primary'
									onClick={() =>
										this.props.startSession(this.state.autoStartRecording)
									}>
									Start
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
			</div>
		);
	}
}

export default SessionModal;
