import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import ProfileContext from "../ProfileContext";

export class Profile extends Component {
	static contextType = ProfileContext;
	state = {
		isEditig: false,
		info: [],
		themes: [],
		editedData: [],
		image: "",
		imgName: "",
		src: "",
		themesToSend: [],
		loaded: 0,

		currentPassword: "",
		password: "",
		matchingPassword: "",

		request: "",
		err: "",
	};

	handleEdit = (e) => {
		e.preventDefault();
		this.setState({ ...this.state, isEditig: true });
		let { currentPassword, password, matchingPassword } = this.state;

		if (this.state.editedData.length !== 0) {
			this.context.handleEdit(this.state.editedData);
			this.setState({ isEditig: false });
		}

		if (currentPassword || password || matchingPassword) {
			if (!currentPassword) {
				this.setState({
					...this.state,
					err: "current Password is required",
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

			if (!password) {
				this.setState({
					...this.state,
					err: "Password is required",
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

			if (!matchingPassword) {
				this.setState({
					...this.state,
					err: "Matching password is required",
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

			if (matchingPassword !== password) {
				this.setState({
					...this.state,
					err: "Passwords should match",
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
				password &&
				currentPassword &&
				matchingPassword &&
				matchingPassword === password
			) {
				this.context.handleChangePWD(
					currentPassword,
					password,
					matchingPassword
				);
				this.setState({ isEditig: false });
			}
		}
	};

	handleFile = (e) => {
		const file = e.target.files[0];
		this.setState({
			image: file,
			src: URL.createObjectURL(file),
			imgName: file.name,
		});
	};

	handleFileSend = () => {
		if (this.state.image) {
			this.context.handleFileSend(this.state.image);
			this.setState({ isEditig: false });
		}
	};

	componentDidMount() {
		this.context.getProfile();
		this.context.getEnrolledThemes();
	}

	render() {
		const profile = this.context.profile;
		const enrolledThemes = this.context.enrolledThemes;
		return (
			<div>
				<div className='container profile profile-view' id='profile'>
					<div className='row'>
						<div className='col-md-12 alert-col relative'>
							<div className='alert alert-info absolue center' role='alert'>
								<button
									type='button'
									className='close'
									data-dismiss='alert'
									aria-label='Close'>
									<span aria-hidden='true'>×</span>
								</button>
								<span>Profile save with success</span>
							</div>
						</div>
					</div>
					<form onSubmit={(e) => this.handleEdit(e)}>
						<div className='form-row profile-row'>
							<div className='col-md-4 relative'>
								<div className='avatar'>
									<div className='avatar-bg center' id='image-holder'>
										{(profile.picture || this.state.src) && (
											<div>
												<img
													src={
														this.state.src
															? this.state.src
															: `https://app.visioconf.site/img/${profile.picture}`
													}
													alt='profile'
												/>
												{this.state.isEditig && (
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
											</div>
										)}
									</div>
								</div>

								{this.state.isEditig && (
									<div className='d-flex'>
										<input
											type='file'
											className='form-control'
											name='avatar-file'
											id='fileUpload'
											onChange={this.handleFile}
										/>
										<button
											type='button'
											className='btn btn-primary ml-2'
											onClick={this.handleFileSend}>
											UPLOAD
										</button>
									</div>
								)}
							</div>
							<div className='col-md-8'>
								<h1>Profile </h1>

								<hr />
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
								<div className='form-row'>
									<div className='col-sm-12 col-md-6'>
										{this.state.isEditig ? (
											<div className='form-group'>
												<h5>First Name </h5>
												<input
													className='form-control'
													type='text'
													name='firstname'
													defaultValue={profile.firstName}
													onChange={(e) =>
														this.setState({
															...this.state,
															editedData: {
																...this.state.editedData,
																firstName: e.target.value,
															},
														})
													}
													required
												/>
											</div>
										) : (
											<div>
												<h5>First Name: </h5>
												<span> {profile.firstName}</span>
											</div>
										)}
									</div>
									<div className='col-sm-12 col-md-6'>
										{this.state.isEditig ? (
											<div className='form-group'>
												<h5>Last Name </h5>
												<input
													className='form-control'
													type='text'
													name='lastname'
													defaultValue={profile.lastName}
													onChange={(e) =>
														this.setState({
															...this.state,
															editedData: {
																...this.state.editedData,
																lastName: e.target.value,
															},
														})
													}
													required
												/>
											</div>
										) : (
											<div>
												<h5>Last Name: </h5>
												<span> {profile.lastName}</span>
											</div>
										)}
									</div>
								</div>
								<div className='form-row'>
									<div className='col-sm-12 col-md-6'>
										{jwt_decode(localStorage.token).roles[0] === "STUDENT" && (
											<div className='mt-5'>
												<h5>Subscribed themes: </h5>
												{enrolledThemes.map((theme) => (
													<div key={theme.value}>
														-{theme.value}
														{theme.status === "OPEN" &&
															"  (Please wait for admin approval)"}
													</div>
												))}
											</div>
										)}
									</div>
									<div className='col-sm-12 col-md-6 mt-5'>
										{this.state.isEditig && (
											<div className='form-group'>
												<h5 className='mb-5'>Change password:</h5>
												<h6>Current password </h6>
												<input
													className='form-control mb-3'
													type='password'
													name='currentPassword'
													onChange={(e) =>
														this.setState({
															...this.state,
															currentPassword: e.target.value,
														})
													}
												/>
												<h6>New password </h6>
												<input
													className='form-control mb-3'
													type='password'
													name='password'
													onChange={(e) =>
														this.setState({
															...this.state,
															password: e.target.value,
														})
													}
												/>
												<h6>Matching password </h6>
												<input
													className='form-control'
													type='password'
													name='matchingPassword'
													onChange={(e) =>
														this.setState({
															...this.state,
															matchingPassword: e.target.value,
														})
													}
												/>
											</div>
										)}
									</div>
								</div>

								<hr />
								{this.state.isEditig ? (
									<div className='form-row'>
										<div className='col-md-12 content-right'>
											<button
												className='btn btn-primary form-btn'
												type='submit'>
												SAVE
											</button>
											<button
												className='btn btn-danger form-btn'
												type='reset'
												onClick={() => this.setState({ isEditig: false })}>
												CANCEL
											</button>
										</div>
									</div>
								) : (
									<button
										className='btn btn-primary form-btn'
										type='button'
										onClick={() => this.setState({ isEditig: true })}>
										Edit
									</button>
								)}
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Profile;
