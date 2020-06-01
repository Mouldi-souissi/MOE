import React, { Component } from "react";
import CourseContext from "../CourseContext";

export class ArticleModal extends Component {
	static contextType = CourseContext;
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
		let { title, type, textFile, video, videoTitle } = this.state;
		const err = this.context.err;
		const request = this.context.request;
		const loadedPic = this.context.loadedPic;
		const loadedFile = this.context.loadedFile;
		const loadedvideo = this.context.loadedvideo;
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
								{request && (
									<p
										className={
											request === "fail"
												? "alert alert-danger"
												: "alert alert-success"
										}>
										{err}
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
										{loadedPic !== 0 && (
											<div className='progress'>
												<div
													className='progress-bar'
													role='progressbar'
													style={{ width: `${loadedPic}%` }}
													aria-valuenow={loadedPic}
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
										onClick={() =>
											this.context.handlePictureUpload(
												this.state.image,
												this.props.id
											)
										}>
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
										{loadedFile !== 0 && (
											<div className='progress'>
												<div
													className='progress-bar'
													role='progressbar'
													style={{ width: `${loadedFile}%` }}
													aria-valuenow={loadedFile}
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
												this.context.handleTextFileSend(
													textFile,
													title,
													type,
													this.props.id
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
										{loadedvideo !== 0 && (
											<div className='progress'>
												<div
													className='progress-bar'
													role='progressbar'
													style={{ width: `${loadedvideo}%` }}
													aria-valuenow={loadedvideo}
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
												this.context.handleVideoSend(
													video,
													videoTitle,
													this.props.id
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
