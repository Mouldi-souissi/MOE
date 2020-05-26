import React, { Component } from "react";
import axios from "axios";

export const ThemeContext = React.createContext();

class ThemeProvider extends Component {
	state = {
		themes: [],
		courses: [],
		enrolledCourses: [],
		enrolledThemes: [],
		filteredCourses: [],
		isFiltering: false,
	};

	// themes

	getAllThemes = () => {
		axios({
			url: "http://91.134.133.143:9090/api/v1/public/themes",
			method: "get",
		})
			.then((res) => this.setState({ themes: res.data.payload }))
			.catch((err) => console.log(err));
	};

	handleEnrollTheme = (value) => {
		axios({
			url: "http://91.134.133.143:9090/api/v1/themes/enroll",
			method: "POST",
			headers: { authorization: localStorage.getItem("token") },
			data: {
				values: [value],
			},
		})
			.then((res) => {
				this.setState({});
			})
			.catch((err) => console.log(err));
	};

	handleUnEnroll = (value) => {
		axios({
			url: "http://91.134.133.143:9090/api/v1/themes/un-enroll",
			method: "POST",
			headers: { authorization: localStorage.getItem("token") },
			data: {
				values: [value],
			},
		})
			.then((res) => {
				this.setState({});
			})
			.catch((err) => console.log(err));
	};

	// courses

	getAllCourses = () => {
		axios({
			url: "http://91.134.133.143:9090/api/v1/courses",
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) =>
				this.setState({
					courses: res.data.payload,
				})
			)
			.catch((err) => console.log(err));
	};

	handleEnrollCourse = (id) => {
		axios({
			url: `http://91.134.133.143:9090/api/v1/courses/${id}/enroll`,
			method: "POST",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then(() => {
				this.setState({});
				this.getEnrolledCources();
			})
			.catch((err) => console.log(err));
	};

	handleUnEnrollCourse = (id) => {
		axios({
			url: `http://91.134.133.143:9090/api/v1/courses/${id}/un-enroll`,
			method: "POST",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then(() => {
				this.setState({});
				this.getEnrolledCources();
			})
			.catch((err) => console.log(err));
	};

	getEnrolledCources = () => {
		axios({
			url: "http://91.134.133.143:9090/api/v1/courses?findEnrollments=true",
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					enrolledCourses: res.data.payload.filter((el) => el.enrollment),
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getEnrolledThemes = () => {
		axios({
			url: "http://91.134.133.143:9090/api/v1/users/themes/enrollments",
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => this.setState({ enrolledThemes: res.data.payload }))
			.catch((err) => console.log(err));
	};

	handleSelect = (value) => {
		axios({
			url: `http://91.134.133.143:9090/api/v1/courses?theme=${value}`,
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					filteredCourses: res.data.payload,
					isFiltering: true,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		const {
			themes,
			courses,
			enrolledCourses,
			enrolledThemes,
			filteredCourses,
			isFiltering,
		} = this.state;
		const {
			getAllThemes,
			getAllCourses,
			handleEnrollTheme,
			handleUnEnroll,
			handleEnrollCourse,
			handleUnEnrollCourse,
			getEnrolledCources,
			getEnrolledThemes,
			handleSelect,
		} = this;
		return (
			<ThemeContext.Provider
				value={{
					themes,
					courses,
					enrolledCourses,
					enrolledThemes,
					filteredCourses,
					isFiltering,
					getAllThemes,
					getAllCourses,
					handleEnrollTheme,
					handleUnEnroll,
					handleEnrollCourse,
					handleUnEnrollCourse,
					getEnrolledCources,
					getEnrolledThemes,
					handleSelect,
				}}>
				{this.props.children}
			</ThemeContext.Provider>
		);
	}
}

export default ThemeContext;

export { ThemeProvider };
