import React, { Component } from "react";
import axios from "axios";
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
	};

	handleEdit = () => {
		this.setState({ isEditig: true });
		if (this.state.editedData.length !== 0) {
			this.context.handleEdit(this.state.editedData);
			this.setState({ isEditig: false });
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

	getThemes = () => {
		axios({
			url: "https://app.visioconf.site/api/v1/users/themes/enrollments",
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => this.setState({ themes: res.data.payload }))
			.catch((err) => console.log(err));
	};
	componentDidMount() {
		this.context.getProfile();
		this.getThemes();
	}

	render() {
		let profile = this.context.profile;
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
					<form>
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
								{jwt_decode(localStorage.token).roles[0] === "STUDENT" && (
									<div className='mt-5'>
										<h5>Subscribed themes: </h5>
										{this.state.themes.map((theme) => (
											<div key={theme.value}>-{theme.value}</div>
										))}
									</div>
								)}

								<hr />
								{this.state.isEditig ? (
									<div className='form-row'>
										<div className='col-md-12 content-right'>
											<button
												className='btn btn-primary form-btn'
												type='button'
												onClick={this.handleEdit}>
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
