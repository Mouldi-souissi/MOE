import React, { Component } from "react";
// import desk from "../assets/desk.jpg";
import axios from "axios";
import { withRouter } from "react-router";
import ReactQuill from "react-quill";
import ArticleModal from "./ArticleModal";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { VideoPlayer } from "./VideoPlayer";
import SessionModal from "./SessionModal";

export class Article extends Component {
	state = {
		courses: [],
		isEditing: false,
		editedData: {},
		bonusFiles: [],
		exams: [],
		loaded: 0,
		sessions: [],
		recordings: [],
		isStudent:
			localStorage.getItem("token") !== null &&
			jwt_decode(localStorage.token).roles[0] === "STUDENT",
		// form msg
		request: "",
		err: "",
	};
	modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
			],

			["clean"],
		],
	};

	formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
	];

	getAllCourses = () => {
		axios({
			url: "https://app.visioconf.site/api/v1/courses",
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					courses: res.data.payload.filter(
						(el) => el.id === Number(this.props.match.params.id)
					),
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleText = (value) => {
		this.setState({
			...this.state,
			editedData: { ...this.state.editedData, description: value },
		});
	};

	handleEdit = () => {
		let theme = this.state.courses[0] && this.state.courses[0].theme.value;
		let editedData = { ...this.state.editedData, theme };

		axios({
			url: `https://app.visioconf.site/api/v1/courses/${this.props.match.params.id}`,
			method: "put",
			headers: { authorization: localStorage.getItem("token") },
			data: editedData,
		})
			.then(window.location.reload(false), this.setState({ isEditing: false }))
			.catch((err) => console.log(err));
	};

	handleFileSend = (image) => {
		if (!image)
			this.setState({
				...this.state,
				err: "Please select an image file",
				request: "fail",
			});

		var formData = new FormData();
		formData.append("file", image);
		image &&
			axios({
				url: `https://app.visioconf.site/api/v1/courses/${this.props.match.params.id}/picture`,
				method: "POST",
				headers: { authorization: localStorage.getItem("token") },
				data: formData,
				onUploadProgress: (ProgressEvent) => {
					this.setState({
						loaded1: (ProgressEvent.loaded / ProgressEvent.total) * 100,
					});
					this.state.loaded1 === 100 && window.location.reload(false);
				},
			}).catch((err) => console.log(err));
	};

	handleTextFileSend = (textFile, title, description, type) => {
		if (!type) {
			type = "PRESENTATION";
		}
		if (!textFile)
			this.setState({
				...this.state,
				err: "Please select a text file",
				request: "fail",
			});
		if (!title)
			this.setState({
				...this.state,
				err: "Please fill title field",
				request: "fail",
			});
		var formData = new FormData();
		formData.append("file", textFile);
		textFile &&
			title &&
			axios({
				url: `https://app.visioconf.site/api/v1/courses/${this.props.match.params.id}/attachments?description=${description}&title=${title}&type=${type}`,
				method: "POST",
				headers: { authorization: localStorage.getItem("token") },
				data: formData,
				onUploadProgress: (ProgressEvent) => {
					this.setState({
						loaded2: (ProgressEvent.loaded / ProgressEvent.total) * 100,
					});
					this.state.loaded2 === 100 && window.location.reload(false);
				},
			}).catch((err) => console.log(err));
	};
	handleVideoSend = (video, videoTitle, videoDescription) => {
		if (!video)
			this.setState({
				...this.state,
				err: "Please select a video",
				request: "fail",
			});
		if (!videoTitle)
			this.setState({
				...this.state,
				err: "Please fill video title field",
				request: "fail",
			});

		var formData = new FormData();
		formData.append("file", video);
		video &&
			videoTitle &&
			axios({
				url: `https://app.visioconf.site/api/v1/courses/${this.props.match.params.id}/attachments?description=${videoDescription}&title=${videoTitle}&type=VIDEO_YT`,
				method: "POST",
				headers: { authorization: localStorage.getItem("token") },
				data: formData,
				onUploadProgress: (ProgressEvent) => {
					this.setState({
						loaded3: (ProgressEvent.loaded / ProgressEvent.total) * 100,
					});
					this.state.loaded3 === 100 && window.location.reload(false);
				},
			}).catch((err) => console.log(err));
	};

	getUploaded = () => {
		axios({
			url: `https://app.visioconf.site/api/v1/courses/${this.props.match.params.id}/attachments`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => this.setState({ bonusFiles: res.data.payload }))
			.catch((err) => console.log(err));
	};
	getExamsByCourse = () => {
		axios({
			url: `https://app.visioconf.site/api/v1/courses/${this.props.match.params.id}/exams`,
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					exams: res.data.payload,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleDeleteFiles = (id) => {
		axios({
			url: `https://app.visioconf.site/api/v1/attachments/${id}`,
			method: "delete",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then(window.location.reload(false), this.setState({ isEditing: false }))
			.catch((err) => console.log(err));
	};

	startSession = (autoStartRecording) => {
		axios({
			url: `https://app.visioconf.site/api/v1/courses/${
				this.state.courses[0].id
			}/meetings/create?autoStartRecording=${
				autoStartRecording === "No" ? false : true
			}`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => window.open(`${res.data.payload}`, "_blank"))
			.catch((err) => console.log(err));
	};

	joinSession = () => {
		axios({
			url: `https://app.visioconf.site/api/v1/courses/${this.state.courses[0].id}/meetings/join`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => window.open(`${res.data.payload}`, "_blank"))
			.catch((err) => console.log(err));
	};

	getSessions = () => {
		axios({
			url: `https://app.visioconf.site/api/v1/courses/${this.props.match.params.id}/meetings?running=true`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => this.setState({ sessions: res.data.payload }))
			.catch((err) => console.log(err));
	};

	getRecordedSessions = () => {
		axios({
			url: `https://app.visioconf.site/api/v1/courses/${this.props.match.params.id}/meetings/recordings`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) =>
				this.setState({
					recordings: res.data.payload,
				})
			)
			.catch((err) => console.log(err));
	};

	componentDidMount() {
		this.getAllCourses();
		this.getUploaded();
		this.getExamsByCourse();
		this.getSessions();
		this.getRecordedSessions();
	}
	render() {
		if (this.state.courses[0] !== undefined) {
			var s = this.state.courses[0].description;
			var justHtmlContent = document.getElementById("justHtml");
			this.state.isEditing
				? (justHtmlContent.innerHTML = "")
				: (justHtmlContent.innerHTML = s);
		}
		const style = {
			backgroundImage: ` url(${`https://app.visioconf.site/img/${
				this.state.courses[0] && this.state.courses[0].picture
			}`})`,

			backgroundSize: "cover",
			backgroundPosition: "center center",
			backgroundRepeat: "no-repeat",
			minHeight: "400px",
			// backgroundAttachment: "fixed",
			// width: "100%",
		};
		return (
			<div>
				<div className='container mt-5'>
					<div
						className='jumbotron p-3 p-md-5 text-white rounded bg-dark'
						style={style}>
						<div className='col-md-6 px-0'>
							<h1 className='display-4'>
								{this.state.courses[0] && this.state.courses[0].title}
							</h1>

							<p className='blog-post-meta'>
								{this.state.courses[0] && this.state.courses[0].createdDate} by{" "}
								<a href='/'>
									{this.state.courses[0] &&
										this.state.courses[0].createdBy.lastName}
								</a>
							</p>
						</div>
					</div>
				</div>

				<main role='main' className='container'>
					<div className='row'>
						<div className='col-md-8 blog-main'>
							<div className='pb-3 mb-4 border-bottom'>
								<button
									className='btn btn-primary ml-5'
									onClick={() => this.props.history.goBack()}>
									Go Back
								</button>

								{this.state.courses[0] &&
									this.state.courses[0].createdBy.id ===
										jwt_decode(localStorage.token).id && (
										<span>
											<i
												type='button'
												className='fa fa-upload btn btn-outline-dark ml-2'
												aria-hidden='true'
												data-toggle='modal'
												data-target='#exampleModal'
												onClick={() =>
													this.setState({
														isUploading: !this.state.isUploading,
													})
												}
											/>
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
												<i
													type='button'
													className='fa fa-floppy-o btn btn-outline-success ml-2'
													aria-hidden='true'
													onClick={this.handleEdit}
												/>
											)}
											<div className='edit'>
												{this.state.isEditing && (
													<div className='mt-5 form-group'>
														<h5 className='center'>Change title:</h5>
														<input
															className='form-control tooLong'
															type='text'
															name='title'
															defaultValue={
																this.state.courses[0] &&
																this.state.courses[0].title
															}
															onChange={(e) =>
																this.setState({
																	...this.state,
																	editedData: {
																		...this.state.editedData,
																		title: e.target.value,
																	},
																})
															}
														/>
													</div>
												)}
												{this.state.isEditing && (
													<div className='mt-5 form-group'>
														<h5 className='center'>
															Change Short description:
														</h5>
														<textarea
															className='form-control tooLong'
															type='text'
															name='title'
															defaultValue={
																this.state.courses[0] &&
																this.state.courses[0].shortDescription
															}
															onChange={(e) =>
																this.setState({
																	...this.state,
																	editedData: {
																		...this.state.editedData,
																		shortDescription: e.target.value,
																	},
																})
															}
														/>
													</div>
												)}
												{this.state.isEditing && (
													<div className='mt-5 tooLong'>
														<h5 className='center '>Edit text:</h5>
														<ReactQuill
															modules={this.modules}
															formats={this.formats}
															defaultValue={
																this.state.courses[0] &&
																this.state.courses[0].description
															}
															onChange={this.handleText}
															theme='snow'
														/>
													</div>
												)}

												<ArticleModal
													handleFileSend={this.handleFileSend}
													handleTextFileSend={this.handleTextFileSend}
													handleVideoSend={this.handleVideoSend}
													loaded1={this.state.loaded1}
													loaded2={this.state.loaded2}
													loaded3={this.state.loaded3}
													request={this.state.request}
													err={this.state.err}
												/>
											</div>
										</span>
									)}
							</div>

							<div className='blog-post'>
								<div id='justHtml'></div>
							</div>
							<div>
								<h5 className='mt-5'>Download attachment files:</h5>
								{this.state.bonusFiles &&
									this.state.bonusFiles
										.filter((el) => el.type !== "VIDEO_YT")
										.map((el) => (
											<div
												className='d-flex align-items-center justify-content-between '
												key={el.id}>
												<a
													href={`https://app.visioconf.site/attachment/${el.fileName}`}
													download={el.title}
													target='_blank'
													rel='noopener noreferrer'>
													<div
														src={`https://app.visioconf.site/attachment/${el.fileName}`}>
														{el.title}
													</div>
												</a>
												{this.state.courses[0] &&
													this.state.courses[0].createdBy.id ===
														jwt_decode(localStorage.token).id && (
														<i
															type='button'
															className='fa fa-times btn btn-outline-danger ml-5 mb-2'
															aria-hidden='true'
															onClick={() => this.handleDeleteFiles(el.id)}
														/>
													)}
											</div>
										))}
								{this.state.bonusFiles && (
									<div className='mt-5'>No attachments found</div>
								)}
							</div>
							{this.state.bonusFiles &&
								this.state.bonusFiles.find((el) => el.type === "VIDEO_YT") && (
									<div>
										<h5 className='mt-5'>Attachment Video:</h5>
										<VideoPlayer
											videoId={
												this.state.bonusFiles[0] &&
												this.state.bonusFiles[0].videoYtId
											}
										/>
									</div>
								)}
						</div>

						<aside className='col-md-4 blog-sidebar'>
							<div className='p-3 mb-3 bg-light rounded'>
								<h4 className=''>About</h4>
								<p className='mb-0'>
									{this.state.courses[0] &&
										this.state.courses[0].shortDescription}
								</p>
							</div>

							<div className='p-3'>
								<div className='d-flex align-items-center justify-content-between mb-5'>
									<h4>Exams of this course</h4>
									{this.state.courses[0] &&
										this.state.courses[0].createdBy.id ===
											jwt_decode(localStorage.token).id && (
											<Link to={`/addExam${this.props.match.params.id}`}>
												<button className='btn btn-primary'>Create exam</button>
											</Link>
										)}
								</div>

								<ol className='list-unstyled mb-0'>
									{this.state.exams &&
										this.state.exams.map((el) => (
											<div key={el.id} className='mb-4'>
												<Link
													to={{
														pathname: `/exam${el.id}`,
														isOwner:
															this.state.courses[0] &&
															this.state.courses[0].createdBy.id ===
																jwt_decode(localStorage.token).id,
													}}>
													{el.title}
												</Link>

												<Link to={`/scores${el.id}`}>
													<button className='btn btn-success float-right'>
														Scores
													</button>
												</Link>
											</div>
										))}
								</ol>
							</div>
							<div className='p-3'>
								<div className='d-flex align-items-center mb-2'>
									<h4>Live Session</h4>
									{this.state.courses[0] &&
										this.state.courses[0].createdBy.id ===
											jwt_decode(localStorage.token).id && (
											<button
												className='btn btn-secondary ml-5'
												type='button'
												aria-hidden='true'
												data-toggle='modal'
												data-target='#SessionModal'>
												Create
											</button>
										)}
									<SessionModal startSession={this.startSession} />

									<button
										className={
											this.state.sessions.length !== 0
												? "btn btn-primary ml-3"
												: "btn btn-primary disabled ml-3"
										}
										onClick={
											this.state.sessions.length ? this.joinSession : undefined
										}>
										Join
									</button>
								</div>
								{this.state.sessions.length === 0 && (
									<h6 className='ml-3'>No Active Sessions Found</h6>
								)}
							</div>
							<div className='p-3'>
								<h4>Recorded Session</h4>
								<ol className='list-unstyled mb-0'>
									{this.state.recordings &&
										this.state.recordings.map((rec, i) => (
											<a
												href={`${rec.url}`}
												target='_blank'
												rel='noopener noreferrer'
												key={i}>
												{rec.endDate}
											</a>
										))}
								</ol>
							</div>
						</aside>
					</div>
				</main>
			</div>
		);
	}
}

export default withRouter(Article);
