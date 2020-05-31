import React, { Component } from "react";

export class ArticleModal extends Component {
	state = {
		image: "",
		src: "",
		imgName: "",
		// pdf/doc
		title: "",
		description: "",
		type: "",
		textFile: "",
		// video
		video: "",
		videoTitle: "",
		videoDescription: "",
	};

	handleImageFile = (e) => {
		const file = e.target.files[0];
		this.setState({
			image: file,
			src: URL.createObjectURL(file),
			imgName: file.name,
		});
	};
	handleTextFile = (e) => {
		const file = e.target.files[0];
		this.setState({
			textFile: file,
		});
	};
	handleVideo = (e) => {
		const file = e.target.files[0];
		this.setState({
			video: file,
		});
	};

	render() {
		let {
			title,
			description,
			type,
			textFile,
			video,
			videoTitle,
			videoDescription,
		} = this.state;
		return (
			<div>
				<div
					className='modal'
					tabIndex='-1'
					role='dialog'
					id='exampleModal'
					data-backdrop='static'>
					<div className='modal-dialog modal-dialog-centered' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h4 className='modal-title'>Upload files</h4>

								<button
									type='button'
									className='close'
									data-dismiss='modal'
									aria-label='Close'>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div>
							<div className='modal-body'>
								{this.props.request && (
									<p
										className={
											this.props.request === "fail"
												? "alert alert-danger"
												: "alert alert-success"
										}>
										{this.props.err}
									</p>
								)}
								<div>
									<h5>Change cover photo:</h5>

									<div className='form-group'>
										<input
											className='form-control'
											type='file'
											name='courseFile'
											onChange={this.handleImageFile}
										/>
										{this.props.loaded1 && (
											<div className='progress'>
												<div
													className='progress-bar'
													role='progressbar'
													style={{ width: `${this.props.loaded1}%` }}
													aria-valuenow={this.props.loaded1}
													aria-valuemin='0'
													aria-valuemax='100'></div>
											</div>
										)}
									</div>
									<div>
										{this.state.src && (
											<img
												src={this.state.src}
												alt='pic'
												style={{ width: "200px" }}
												className='mb-3'
											/>
										)}
									</div>
									<button
										className='btn btn-primary'
										onClick={() => this.props.handleFileSend(this.state.image)}>
										Upload
									</button>
									<hr />
								</div>
								<div>
									<h5>Upload Text/PDF file:</h5>

									<div className='form-group'>
										<input
											className='form-control'
											type='file'
											name='courseFile'
											accept='application/pdf,application/msword,
											application/vnd.openxmlformats-officedocument.wordprocessingml.document'
											onChange={this.handleTextFile}
											required
										/>
										{this.props.loaded2 && (
											<div className='progress'>
												<div
													className='progress-bar'
													role='progressbar'
													style={{ width: `${this.props.loaded2}%` }}
													aria-valuenow={this.props.loaded2}
													aria-valuemin='0'
													aria-valuemax='100'></div>
											</div>
										)}

										<h6 className='mt-2'>Title for Text/PDF :</h6>

										<input
											className='form-control'
											type='text'
											name='title/description'
											onChange={(e) =>
												this.setState({
													...this.state,
													title: e.target.value,
													description: e.target.value,
												})
											}
											required
										/>
										<form
											className='d-flex'
											onChange={(e) =>
												this.setState({ ...this.state, type: e.target.value })
											}>
											<div>
												<input
													type='radio'
													id='huey'
													name='drone'
													value='PRESENTATION'
													defaultChecked
												/>
												<label htmlFor='doc' className='mr-3'>
													doc
												</label>
											</div>

											<div>
												<input
													type='radio'
													id='dewey'
													name='drone'
													value='DOCUMENT'
												/>
												<label htmlFor='pdf'>pdf</label>
											</div>
										</form>
										<button
											className='btn btn-primary'
											onClick={() =>
												this.props.handleTextFileSend(
													textFile,
													title,
													description,
													type
												)
											}>
											Upload
										</button>
									</div>
									<hr />
								</div>
								<div>
									<h5>Upload Video:</h5>

									<div className='form-group'>
										<input
											className='form-control'
											type='file'
											name='courseFile'
											onChange={this.handleVideo}
											required
										/>
										{this.props.loaded3 && (
											<div className='progress'>
												<div
													className='progress-bar'
													role='progressbar'
													style={{ width: `${this.props.loaded3}%` }}
													aria-valuenow={this.props.loaded3}
													aria-valuemin='0'
													aria-valuemax='100'></div>
											</div>
										)}

										<h6 className='mt-2'>Video title :</h6>
										<input
											className='form-control'
											type='text'
											name='title/description'
											onChange={(e) =>
												this.setState({
													videoTitle: e.target.value,
													videoDescription: e.target.value,
												})
											}
											required
										/>
										<button
											className='btn btn-primary mt-3'
											onClick={() =>
												this.props.handleVideoSend(
													video,
													videoTitle,
													videoDescription
												)
											}>
											Upload
										</button>
									</div>
								</div>
							</div>
							<div className='modal-footer'>
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

export default ArticleModal;
