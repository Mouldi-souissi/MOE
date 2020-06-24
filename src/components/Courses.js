import React, { Component } from "react";
import CourseCard from "./CourseCard";
import jwt_decode from "jwt-decode";
import ThemeContext from "../ThemeContext";
const Moment = require("moment");

export class Courses extends Component {
	static contextType = ThemeContext;
	state = {
		isFiltering: false,
		courses: [],
	};

	componentDidMount() {
		if (jwt_decode(localStorage.token).roles[0] === "STUDENT") {
			this.context.getEnrolledCources();
			this.context.getEnrolledThemes();
		} else {
			this.context.getAllcourseByInstructor(jwt_decode(localStorage.token).id);
		}
	}
	render() {
		const enrolledCourses = this.context.enrolledCourses
			.sort((a, b) => new Moment(a.createdDate) - new Moment(b.createdDate))
			.reverse();
		const enrolledThemes = this.context.enrolledThemes.filter(
			(el) => el.status === "ACCEPTED"
		);
		const isFiltering = this.context.isFiltering;
		const filteredCourses = this.context.filteredCourses
			.sort((a, b) => new Moment(a.createdDate) - new Moment(b.createdDate))
			.reverse();

		const coursesInstructor = this.context.coursesInstructor
			.sort((a, b) => new Moment(a.createdDate) - new Moment(b.createdDate))
			.reverse();

		return (
			<div className='container-fluid'>
				{jwt_decode(localStorage.token).roles[0] === "STUDENT" && (
					<div>
						<h4 className='sectionTitle'>Pick a theme:</h4>
						<select
							className='form-control shadow-none mb-5'
							onChange={(e) => this.context.handleSelect(e.target.value)}
							defaultValue='DEFAULT'>
							<option value='DEFAULT' disabled>
								. . .
							</option>
							{enrolledThemes &&
								enrolledThemes.map((theme) => (
									<option key={theme.value}>{theme.value}</option>
								))}
						</select>
					</div>
				)}
				{jwt_decode(localStorage.token).roles[0] === "INSTRUCTOR" && (
					<div className='row justify-content-center'>
						{coursesInstructor.map((course) => (
							<CourseCard
								key={course.id}
								course={course}
								handleScores={this.props.handleScores}
							/>
						))}
					</div>
				)}
				{/* <h4 className='sectionTitle'>All courses:</h4> */}
				<div className='row justify-content-center'>
					{isFiltering &&
						filteredCourses.map((course) => (
							<CourseCard
								key={course.id}
								course={course}
								handleScores={this.props.handleScores}
							/>
						))}
				</div>
				{jwt_decode(localStorage.token).roles[0] === "STUDENT" && (
					<div>
						<h4 className='sectionTitle'>Subscribed courses:</h4>
						<div className='row justify-content-center'>
							{enrolledCourses.map((course) => (
								<CourseCard
									key={course.id}
									course={course}
									handleScores={this.props.handleScores}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Courses;
