import React, { Component } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";

export class ThemeCourses extends Component {
	state = {
		courses: [],
	};
	getCoursesByTheme = () => {
		axios({
			url: `http://91.134.133.143:9090/api/v1/courses?theme=${this.props.match.params.value}`,
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					courses: res.data.payload,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	componentDidMount() {
		this.getCoursesByTheme();
	}
	render() {
		return (
			<div className='album py-5 bg-light mt-5'>
				<button
					className='btn btn-primary mt-5 ml-2'
					onClick={() => this.props.history.goBack()}>
					Go Back
				</button>
				<div className='container'>
					<h3>{this.props.match.params.value}:</h3>

					<div className='row'>
						{this.state.courses &&
							this.state.courses.map((course) => (
								<CourseCard key={course.id} course={course} />
							))}
					</div>
				</div>
			</div>
		);
	}
}

export default ThemeCourses;
