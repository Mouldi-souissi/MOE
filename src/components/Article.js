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
import CourseContext from "../CourseContext";
import moment from "moment";
import DeleteFileModal from "./DeleteFileModal";

export class Article extends Component {
	static contextType = CourseContext;
	state = {
		isEditing: false,
		editedData: {},
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
		isdeleting: false,
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

	handleText = (value) => {
		this.setState({
			...this.state,
			editedData: { ...this.state.editedData, description: value },
		});
	};

	handleEdit = () => {
		this.context.handleEdit(
			this.props.match.params.id,
			this.state.editedData,
			this.context.course.theme.value
		);
		this.setState({ isEditing: false });
	};

	joinSession = () => {
		axios({
			url: `https://app.visioconf.site/api/v1/courses/${this.context.course.id}/meetings/join`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => window.open(`${res.data.payload}`, "_blank"))
			.catch((err) => console.log(err));
	};

	componentDidMount() {
		this.context.getCourse(this.props.match.params.id);
		this.context.getUploadedTextFiles(this.props.match.params.id);
		this.context.getExamsByCourse(this.props.match.params.id);
		this.context.getSessions(this.props.match.params.id);
		this.context.getRecordedSessions(this.props.match.params.id);
		this.state.isStudent &&
			this.context.checkCompleted(this.props.match.params.id);
	}
	componentDidUpdate() {
		if (this.context.course && this.context.course.description !== undefined) {
			var s = this.context.course.description;
			var justHtmlContent = document.getElementById("justHtml");
			this.state.isEditing
				? (justHtmlContent.innerHTML = "")
				: (justHtmlContent.innerHTML = s);
		}
	}
	render() {
		const course = this.context.course;
		const bonusFiles = this.context.bonusFiles;
		const sessions = this.context.sessions;
		const exams = this.context.exams;
		const recordings = this.context.recordings;
		const status = this.context.status;

		return (
			<div>
				<div className='container mt-5'>
					<div className='jumbotron p-3 p-md-5 text-white rounded bg-dark'>
						<div className='col-md-6 px-0'>
							<h1 className='display-4' style={{ color: "black" }}>
								{course.title}
							</h1>

							<p className='blog-post-meta' style={{ color: "black" }}>
								{moment(course.createdDate).format("MMMM Do YYYY, h:mm a")} by{" "}
								{course.createdBy && course.createdBy.lastName}
							</p>
							{this.context.course.picture && (
								<img
									alt='hero'
									src={`${`https://app.visioconf.site/img/${this.context.course.picture}`}`}
								/>
							)}
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
								{this.state.isStudent && status === "IN_PROGRESS" && (
									<button
										className='btn btn-warning ml-2'
										onClick={() =>
											this.context.handleCompleted(
												this.props.match.params.id,
												jwt_decode(localStorage.token).id
											)
										}>
										Mark Completed
									</button>
								)}
								{this.state.isStudent && status === "COMPLETED" && (
									<span className='ml-5'>Course Completed</span>
								)}

								{course.createdBy &&
									course.createdBy.id === jwt_decode(localStorage.token).id && (
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
															defaultValue={course.title}
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
															defaultValue={course.shortDescription}
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
															defaultValue={course.description}
															onChange={this.handleText}
															theme='snow'
														/>
													</div>
												)}

												<ArticleModal id={this.props.match.params.id} />
											</div>
										</span>
									)}
							</div>

							<div className='blog-post'>
								<div id='justHtml'></div>
							</div>
							<div className='mb-5'>
								<h5 className='mt-5'>Download attachment files:</h5>
								{bonusFiles
									.filter((el) => el.type !== "VIDEO_YT")
									.map((el) => (
										<div
											className='d-flex align-items-center justify-content-between'
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
											{course.createdBy &&
												course.createdBy.id ===
													jwt_decode(localStorage.token).id && (
													<div>
														<i
															type='button'
															className='fa fa-times btn btn-outline-danger ml-5 mb-2'
															aria-hidden='true'
															data-toggle='modal'
															data-target={"#" + el.id}
														/>
														<DeleteFileModal
															id={el.id}
															idCourse={this.props.match.params.id}
														/>
													</div>
												)}
										</div>
									))}
								{!bonusFiles && (
									<div className='mt-5'>No attachments found</div>
								)}
							</div>
							{bonusFiles.find((el) => el.type === "VIDEO_YT") && (
								<div className='mb-5'>
									<h5 className='mt-5'>Attachment Video:</h5>
									<VideoPlayer
										videoId={bonusFiles.videoYtId && bonusFiles.videoYtId}
									/>
								</div>
							)}
						</div>

						<aside className='col-md-4 blog-sidebar'>
							<div className='p-3 mb-3 bg-light rounded'>
								<h4 className=''>About</h4>
								<p className='mb-0'>{course.shortDescription}</p>
							</div>

							<div className='p-3'>
								<div className='d-flex align-items-center justify-content-between mb-5'>
									<h4>Exams of this course</h4>
									{course.createdBy &&
										course.createdBy.id ===
											jwt_decode(localStorage.token).id && (
											<Link to={`/addExam${this.props.match.params.id}`}>
												<button className='btn btn-primary'>Create exam</button>
											</Link>
										)}
								</div>

								<ol className='list-unstyled mb-0'>
									{exams.map((el) => (
										<div key={el.id} className='mb-4'>
											<Link
												to={{
													pathname: `/exam${el.id}`,
													// isOwner:
													// 	course.createdBy &&
													// 	course.createdBy.id ===
													// 		jwt_decode(localStorage.token).id,
												}}>
												-{el.title}
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
									{course.createdBy &&
										course.createdBy.id ===
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
									<SessionModal idCourse={this.props.match.params.id} />

									<button
										className={
											sessions.length !== 0
												? "btn btn-primary ml-3"
												: "btn btn-primary disabled ml-3"
										}
										onClick={sessions.length ? this.joinSession : undefined}>
										Join
									</button>
								</div>
								{sessions.length === 0 && (
									<h6 className='ml-3'>No Active Sessions Found</h6>
								)}
							</div>
							<div className='p-3'>
								<h4>Recorded Session</h4>
								<ol className='list-unstyled mb-0'>
									{recordings.map((rec, i) => (
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
