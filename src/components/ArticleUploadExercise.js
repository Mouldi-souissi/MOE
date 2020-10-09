import React, { Component } from "react";

export class ArticleUploadExercise extends Component {
	state = {
		file: "",
		title: "",
	};
	handleFile = (e) => {
		const file = e.target.files[0];
		this.setState({
			file: file,
		});
	};
	render() {
		return (
			<div
				className='modal'
				tabIndex='-1'
				role='dialog'
				id='uploadExercise'
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
							<div>
								<h5>Choose a file:</h5>

								<div className='form-group'>
									<input
										className='form-control'
										type='file'
										name='courseFile'
										accept='application/pdf,application/msword,
											application/vnd.openxmlformats-officedocument.wordprocessingml.document'
										onChange={this.handleFile}
										required
									/>
									{/* {loadedFile !== 0 && (
										<div className='progress'>
											<div
												className='progress-bar'
												role='progressbar'
												style={{ width: `${loadedFile}%` }}
												aria-valuenow={loadedFile}
												aria-valuemin='0'
												aria-valuemax='100'></div>
										</div>
									)} */}

									<h6 className='mt-2'>Title:</h6>

									<input
										className='form-control'
										type='text'
										name='title/description'
										onChange={(e) =>
											this.setState({
												...this.state,
												title: e.target.value,
											})
										}
										required
									/>
								</div>
								<hr />
							</div>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-primary'
								data-dismiss='modal'>
								Upload
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
		);
	}
}

export default ArticleUploadExercise;
