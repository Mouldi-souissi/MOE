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

	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleCreateCourse = () => {
		let { shortDescription, title, theme, description } = this.state;
		axios({
			url: "http://91.134.133.143:9090/api/v1/courses",
			method: "post",
			headers: { authorization: localStorage.getItem("token") },
			data: { shortDescription, title, theme, description },
		})
			.then((res) => {
				this.setState({ courseID: res.data.payload.id });
				this.handleFileSend();
			})

			.catch((err) => {
				console.log(err);
			});
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
			url: `http://91.134.133.143:9090/api/v1/courses/${this.state.courseID}/picture`,
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

	// handleEdit = () => {
	// 	axios({
	// 		url: `http://91.134.133.143:9090/api/v1/courses/${this.state.courseID}`,
	// 		method: "put",
	// 		headers: { authorization: localStorage.getItem("token") },
	// 		data: { description: this.state.text },
	// 	})
	// 		.then((res) => <Redirect to={`/article${this.state.courseID}`} />)
	// 		.catch((err) => console.log(err));
	// };
	componentDidMount() {
		this.context.getAllThemes();
	}

	render() {
		const themes = this.context.themes;
		return (
			<div className='altFormContainer'>
				<div className='altForm '>
					<div className='bg-white rounded-lg shadow-sm p-5'>
						<h5 className='center mb-3'>ADD Course</h5>
						<ul
							role='tablist'
							className='nav bg-light nav-pills rounded-pill nav-fill mb-3'>
							<li className='nav-item'>
								<div
									data-toggle='pill'
									href='#nav-tab-card'
									className='nav-link active rounded-pill'>
									Step 1
								</div>
							</li>
							<li className='nav-item'>
								<div
									data-toggle='pill'
									href='#nav-tab-paypal'
									className='nav-link rounded-pill'>
									Step 2
								</div>
							</li>
							<li className='nav-item'>
								<div
									data-toggle='pill'
									href='#nav-tab-bank'
									className='nav-link rounded-pill'>
									Step 3
								</div>
							</li>
						</ul>

						<div className='tab-content'>
							<div id='nav-tab-card' className='tab-pane fade show active'>
								{/* <p className='alert alert-success'>
										Some text success or error
									</p> */}
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
										/>
									</div>
								</form>
							</div>

							<div id='nav-tab-paypal' className='tab-pane fade'>
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
									{this.state.src && <img src={this.state.src} alt='pic' />}
								</div>
							</div>

							<div id='nav-tab-bank' className='tab-pane fade'>
								<div className='d-flex mt-2'>
									<h6>Long Description</h6>
									<span className='mr-5'>*</span>
									<span>(Max Characters: 200)</span>
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
									type='button'
									className='subscribe btn btn-primary btn-block rounded-pill shadow-sm mt-3 mb-3'
									onClick={this.handleCreateCourse}>
									Create
								</button>
							</div>
						</div>
					</div>
					<br />
					<h5 className='center'>Required fields * </h5>
				</div>
			</div>
		);
	}
}

export default withRouter(FormSteps);
