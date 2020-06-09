import React, { Component } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { withRouter } from "react-router";
import ThemeContext from "../ThemeContext";

export class FormSteps extends Component {
	static contextType = ThemeContext;
	state = {
		shortDescription: "",
		description: "",
		title: "",
		theme: "",
		text: "",
		courseID: "",
		image: "",
		src: "",
		loaded: 0,
		request: "",
		err: "",
		step: 1,
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

	// Proceed to next step
	nextStep = () => {
		const { step } = this.state;
		this.setState({
			step: step + 1,
		});
	};

	// Go back to prev step
	prevStep = () => {
		const { step } = this.state;
		this.setState({
			step: step - 1,
		});
	};
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleCreateCourse = (e) => {
		e.preventDefault();
		let { shortDescription, title, theme, description } = this.state;
		if (description.length > 300) {
			this.setState({
				...this.state,
				err: "Long description max characters 200",
				request: "fail",
			});
			setTimeout(() => {
				this.setState({
					...this.state,
					err: "",
					request: "",
				});
			}, 3000);
		}

		if (!description) {
			this.setState({
				...this.state,
				err: "Please fill long description field",
				request: "fail",
			});
			setTimeout(() => {
				this.setState({
					...this.state,
					err: "",
					request: "",
				});
			}, 3000);
		}

		if (!shortDescription) {
			this.setState({
				...this.state,
				err: "Please fill description field",
				request: "fail",
			});
			setTimeout(() => {
				this.setState({
					...this.state,
					err: "",
					request: "",
				});
			}, 3000);
		}

		if (!theme) {
			this.setState({
				...this.state,
				err: "Please select a theme",
				request: "fail",
			});
			setTimeout(() => {
				this.setState({
					...this.state,
					err: "",
					request: "",
				});
			}, 3000);
		}

		if (!title) {
			this.setState({
				...this.state,
				err: "Please fill title field",
				request: "fail",
			});
			setTimeout(() => {
				this.setState({
					...this.state,
					err: "",
					request: "",
				});
			}, 3000);
		}

		if (
			description &&
			shortDescription &&
			title &&
			theme &&
			description.length <= 300
		) {
			axios({
				url: "https://app.visioconf.site/api/v1/courses",
				method: "post",
				headers: { authorization: localStorage.getItem("token") },
				data: { shortDescription, title, theme, description },
			})
				.then((res) => {
					this.setState({ ...this.state, courseID: res.data.payload.id });
					this.handleFileSend();
				})

				.catch((err) => {
					console.log(err);
				});
		}
	};

	// handle pic upload

	handleFile = (e) => {
		const file = e.target.files[0];
		this.setState({
			image: file,
			src: URL.createObjectURL(file),
			imgName: file.name,
		});
	};

	handleFileSend = () => {
		var formData = new FormData();
		formData.append("file", this.state.image);

		axios({
			url: `https://app.visioconf.site/api/v1/courses/${this.state.courseID}/picture`,
			method: "POST",
			headers: { authorization: localStorage.getItem("token") },
			data: formData,
			onUploadProgress: (ProgressEvent) => {
				this.setState({
					loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
				});
				this.state.loaded === 100 &&
					this.props.history.push(`/article${this.state.courseID}`);
			},
		}).catch((err) => console.log(err));
	};
	// handle edit

	handleText = (value) => {
		this.setState({ description: value });
	};

	componentDidMount() {
		this.context.getAllThemes();
	}

	render() {
		const themes = this.context.themes;
		switch (this.state.step) {
			case 1:
				return (
					<div className='altFormContainer'>
						<div className='altForm '>
							<div className='bg-white rounded-lg shadow-sm p-5'>
								<h5 className='center mb-3'>Add Course</h5>

								{this.state.request && (
									<p
										className={
											this.state.request === "fail"
												? "alert alert-danger"
												: "alert alert-success"
										}>
										{this.state.err}
									</p>
								)}

								<form>
									<div className='form-group'>
										<label htmlFor='title'>Title </label>
										<span>*</span>
										<input
											className='form-control'
											type='text'
											name='title'
											onChange={this.handleInput}
											required
											maxLength='50'
										/>
									</div>
									<div className='form-group'>
										<label>Theme</label>
										<span>*</span>
										<select
											className='form-control'
											name='theme'
											onChange={this.handleInput}
											required
											defaultValue='DEFAULT'>
											<option value='DEFAULT' disabled>
												. . .
											</option>
											{themes.map((theme, i) => (
												<option key={i}>{theme.value}</option>
											))}
										</select>
									</div>
									<div className='form-group'>
										<label>Description </label>
										<span>*</span>
										<input
											className='form-control'
											type='text'
											name='shortDescription'
											onChange={this.handleInput}
											required
											maxLength='60'
										/>
									</div>
									<button
										className='btn btn-primary'
										onClick={() => this.setState({ step: 2 })}>
										Next
									</button>
								</form>
							</div>
						</div>

						<br />
						<h5 className='center'>Required fields * </h5>
					</div>
				);
			case 2:
				return (
					<div className='altFormContainer'>
						<div className='altForm '>
							<div className='bg-white rounded-lg shadow-sm p-5'>
								<h5 className='center mb-3'>Add Course</h5>

								{this.state.request && (
									<p
										className={
											this.state.request === "fail"
												? "alert alert-danger"
												: "alert alert-success"
										}>
										{this.state.err}
									</p>
								)}

								<p>Upload a cover to your course</p>
								<div className='form-group'>
									<input
										className='form-control'
										type='file'
										name='courseFile'
										onChange={this.handleFile}
									/>
								</div>
								<div>
									{this.state.src && (
										<img src={this.state.src} alt='pic' className='mb-5' />
									)}
								</div>
								<button
									className='btn btn-secondary mr-2'
									onClick={() => this.setState({ step: 1 })}>
									Previous
								</button>
								<button
									className='btn btn-primary'
									onClick={() => this.setState({ step: 3 })}>
									Next
								</button>
							</div>
						</div>
					</div>
				);
			case 3:
				return (
					<div className='altFormContainer'>
						<div className='altForm '>
							<div className='bg-white rounded-lg shadow-sm p-5'>
								<h5 className='center mb-3'>Add Course</h5>

								{this.state.request && (
									<p
										className={
											this.state.request === "fail"
												? "alert alert-danger"
												: "alert alert-success"
										}>
										{this.state.err}
									</p>
								)}

								<div className='d-flex mt-2'>
									<h6>Long Description</h6>
									<span className='mr-5'>*</span>
									<span>(Max Characters: 300)</span>
								</div>

								<ReactQuill
									modules={this.modules}
									formats={this.formats}
									value={this.state.description}
									onChange={this.handleText}
									theme='snow'
								/>
								{this.state.loaded !== 0 && (
									<div className='progress'>
										<div
											className='progress-bar'
											role='progressbar'
											style={{ width: `${this.state.loaded}%` }}
											aria-valuenow={this.state.loaded}
											aria-valuemin='0'
											aria-valuemax='100'></div>
									</div>
								)}
								<button
									className='btn btn-secondary mr-2'
									onClick={() => this.setState({ step: 2 })}>
									Previous
								</button>
								<button
									className='subscribe btn btn-primary shadow-sm mt-3 mb-3'
									onClick={this.handleCreateCourse}>
									Create
								</button>
							</div>
						</div>
					</div>
				);

			default:
				console.log("This is a multi-step form built with React.");
		}
	}
}

export default withRouter(FormSteps);
