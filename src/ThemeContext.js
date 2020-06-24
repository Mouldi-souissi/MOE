import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

export const ThemeContext = React.createContext();

class ThemeProvider extends Component {
	state = {
		themes: [],
		courses: [],
		enrolledCourses: [],
		enrolledThemes: [],
		filteredCourses: [],
		isFiltering: false,
		newCourses: [],
		date: moment(new Date()),
		userExams: [],
		coursesInstructor: [],
		status: [],
	};

	// themes

	getAllThemes = () => {
		axios({
			url: "https://api.gvclearning.site/api/v1/public/themes",
			method: "get",
		})
			.then((res) => this.setState({ themes: res.data.payload }))
			.catch((err) => console.log(err));
	};

	handleEnrollTheme = (value) => {
		axios({
			url: "https://api.gvclearning.site/api/v1/themes/enroll",
			method: "POST",
			headers: { authorization: localStorage.getItem("token") },
			data: {
				values: [value],
			},
		})
			.then((res) => {
				this.setState({});
				this.getEnrolledThemes();
			})
			.catch((err) => console.log(err));
	};

	handleUnEnroll = (value) => {
		axios({
			url: "https://api.gvclearning.site/api/v1/themes/un-enroll",
			method: "POST",
			headers: { authorization: localStorage.getItem("token") },
			data: {
				values: [value],
			},
		})
			.then((res) => {
				this.setState({});
				this.getEnrolledThemes();
			})
			.catch((err) => console.log(err));
	};

	// courses
	getAllcourseByInstructor = (id) => {
		axios({
			url: `https://api.gvclearning.site/api/v1/courses?instructorId=${id}`,
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({ coursesInstructor: res.data.payload });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getAllCourses = () => {
		axios({
			url: "https://api.gvclearning.site/api/v1/courses",
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
			url: `https://api.gvclearning.site/api/v1/courses/${id}/enroll`,
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
			url: `https://api.gvclearning.site/api/v1/courses/${id}/un-enroll`,
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
			url: "https://api.gvclearning.site/api/v1/courses?findEnrollments=true",
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
			url: "https://api.gvclearning.site/api/v1/users/themes/enrollments",
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => this.setState({ enrolledThemes: res.data.payload }))
			.catch((err) => console.log(err));
	};

	handleSelect = (value) => {
		axios({
			url: `https://api.gvclearning.site/api/v1/courses?theme=${value}`,
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

	getNewCourses = () => {
		this.getEnrolledThemes();
		this.state.enrolledThemes.map((theme) =>
			axios({
				url: `https://api.gvclearning.site/api/v1/courses?theme=${theme.value}`,
				method: "GET",
				headers: { authorization: localStorage.getItem("token") },
			})
				.then((res) => {
					let date = moment(new Date()); //todays date
					this.setState({
						newCourses: this.state.newCourses.concat(
							res.data.payload.filter(
								(course) =>
									Math.abs(moment(course.createdDate).diff(date, "hours")) < 24
							)
						),
					});
				})
				.catch((err) => {
					console.log(err);
				})
		);
	};

	getUserExams = () => {
		axios({
			url: `https://api.gvclearning.site/api/v1/exams`,
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({ userExams: res.data.payload });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	checkCompleted = () => {
		axios({
			url: `https://api.gvclearning.site/api/v1/courses/enrollments`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					status: res.data.payload,
				});
			})
			.catch((err) => console.log(err));
	};

	render() {
		const {
			themes,
			courses,
			enrolledCourses,
			enrolledThemes,
			filteredCourses,
			isFiltering,
			newCourses,
			userExams,
			coursesInstructor,
			status,
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
			getNewCourses,
			getUserExams,
			getAllcourseByInstructor,
			checkCompleted,
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
					newCourses,
					userExams,
					coursesInstructor,
					status,

					getAllThemes,
					getAllCourses,
					handleEnrollTheme,
					handleUnEnroll,
					handleEnrollCourse,
					handleUnEnrollCourse,
					getEnrolledCources,
					getEnrolledThemes,
					handleSelect,
					getNewCourses,
					getUserExams,
					getAllcourseByInstructor,
					checkCompleted,
				}}>
				{this.props.children}
			</ThemeContext.Provider>
		);
	}
}

export default ThemeContext;

export { ThemeProvider };
