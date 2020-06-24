import React, { Component } from "react";
import axios from "axios";

export const ProfileContext = React.createContext();

class ProfileProvider extends Component {
	// Context state
	state = { profile: [], enrolledThemes: [], loaded: 0, err: "", request: "" };

	// Method to update state
	getProfile = () => {
		axios({
			url: "https://api.gvclearning.site/api/v1/users/profile",
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					profile: res.data.payload,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	handleEdit = (editedData) => {
		axios({
			url: "https://api.gvclearning.site/api/v1/users/profile",
			method: "PUT",
			headers: { authorization: localStorage.getItem("token") },
			data: editedData,
		})
			.then((res) => {
				this.setState({});
				this.getProfile();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleFileSend = (image) => {
		var formData = new FormData();
		formData.append("file", image);
		axios({
			url: "https://api.gvclearning.site/api/v1/users/profile/photo",
			method: "POST",
			headers: { authorization: localStorage.getItem("token") },
			data: formData,
			onUploadProgress: (ProgressEvent) => {
				this.setState({
					loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
				});
				if (this.state.loaded === 100) {
					this.setState({
						...this.state,
						err: "Image Uploaded",
						request: "success",
					});
					setTimeout(() => {
						this.setState({
							...this.state,
							err: "",
							request: "",
						});
					}, 3000);
				}
			},
		})
			.then(() => {
				this.setState({});
				this.getProfile();
			})
			.catch((err) => console.log(err));
	};

	handleChangePWD = (currentPassword, password, matchingPassword) => {
		axios({
			url: "https://api.gvclearning.site/api/v1/users/edit-pwd",
			method: "PUT",
			headers: { authorization: localStorage.getItem("token") },
			data: { currentPassword, password, matchingPassword },
		})
			.then((res) => {
				this.setState({
					...this.state,
					err: "Password changed",
					request: "success",
				});
				setTimeout(() => {
					this.setState({
						...this.state,
						err: "",
						request: "",
					});
				}, 3000);
				this.getProfile();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getEnrolledThemes = () => {
		axios({
			url: "https://api.gvclearning.site/api/v1/users/themes/enrollments",
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => this.setState({ enrolledThemes: res.data.payload }))
			.catch((err) => console.log(err));
	};
	render() {
		const { children } = this.props;
		const { profile, enrolledThemes, loaded, err, request } = this.state;
		const {
			getProfile,
			handleEdit,
			handleFileSend,
			handleChangePWD,
			getEnrolledThemes,
		} = this;

		return (
			<ProfileContext.Provider
				value={{
					profile,
					enrolledThemes,
					getProfile,
					handleEdit,
					handleFileSend,
					handleChangePWD,
					getEnrolledThemes,
					loaded,
					err,
					request,
				}}>
				{children}
			</ProfileContext.Provider>
		);
	}
}

export default ProfileContext;

export { ProfileProvider };
