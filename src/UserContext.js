import React, { Component } from "react";
import axios from "axios";

export const UserContext = React.createContext();

class UserProvider extends Component {
	state = {
		students: [],
		instructors: [],
		enrollments: [],
		status: "",
	};

	getAllUsers = () => {
		axios({
			url: "https://app.visioconf.site/api/v1/users/student",
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({ students: res.data.payload });

				axios({
					url: "https://app.visioconf.site/api/v1/users/instructor",
					method: "GET",
					headers: { authorization: localStorage.getItem("token") },
				})
					.then((res) => {
						this.setState({ instructors: res.data.payload });
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getThemesEnrollement = () => {
		axios({
			url: "https://app.visioconf.site/api/v1/themes/enrollments",
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({ enrollments: res.data.payload });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	themeEnroll = (themeId, studentId, status) => {
		axios({
			url: `https://app.visioconf.site/api/v1/themes/${themeId}/enrollments?studentId=${studentId}`,
			method: "put",
			headers: { authorization: localStorage.getItem("token") },
			data: { status: status === "ACCEPTED" ? "REFUSED" : "ACCEPTED" },
		})
			.then((res) => {
				this.getThemesEnrollement();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// validate
	handleValidate = (id) => {
		axios({
			url: `https://app.visioconf.site/api/v1/users/activate/${id}`,
			method: "PUT",
			headers: { authorization: localStorage.getItem("token") },
		}).then(() => {
			this.setState({});
			axios({
				url: `https://app.visioconf.site/api/v1/users/validate/${id}`,
				method: "PUT",
				headers: { authorization: localStorage.getItem("token") },
			})
				.then(() => {
					this.setState({});
					this.getAllUsers();
				})
				.catch((err) => console.log(err));
		});
	};

	// edit user

	handleEdit = (editedData, id) => {
		axios({
			url: `https://app.visioconf.site/api/v1/users/${id}`,
			method: "PUT",
			headers: { authorization: localStorage.getItem("token") },
			data: editedData,
		})
			.then(() => {
				this.setState({});
				this.getAllUsers();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// check theme enrollment

	checkEnrollment = (theme) => {
		axios({
			url: `https://app.visioconf.site/api/v1/users/themes/enrollments?theme=${theme}`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({ status: res.data.payload[0].status });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// handle add user
	handleAdd = (user, role) => {
		axios({
			url: `https://app.visioconf.site/api/v1/users/${role}`,
			method: "POST",
			headers: { authorization: localStorage.getItem("token") },
			data: user,
		})
			.then(() => {
				this.setState({});
				this.getAllUsers();
			})
			.catch((err) => console.log(err));
	};
	render() {
		const { children } = this.props;
		const { students, instructors, enrollments, status } = this.state;
		const {
			getAllUsers,
			getThemesEnrollement,
			themeEnroll,
			checkEnrollment,
			handleValidate,
			handleEdit,
			handleAdd,
		} = this;

		return (
			<UserContext.Provider
				value={{
					students,
					instructors,
					enrollments,
					status,
					getAllUsers,
					getThemesEnrollement,
					themeEnroll,
					checkEnrollment,
					handleValidate,
					handleEdit,
					handleAdd,
				}}>
				{children}
			</UserContext.Provider>
		);
	}
}

export default UserContext;

export { UserProvider };
