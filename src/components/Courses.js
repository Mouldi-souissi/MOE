import React, { Component } from "react";
import CourseCard from "./CourseCard";
// import axios from "axios";
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
		this.context.getAllCourses();
		this.context.getEnrolledCources();
		this.context.getEnrolledThemes();
	}
	render() {
		const courses = this.context.courses
			.sort((a, b) => new Moment(a.createdDate) - new Moment(b.createdDate))
			.reverse();
		const enrolledCourses = this.context.enrolledCourses
			.sort((a, b) => new Moment(a.createdDate) - new Moment(b.createdDate))
			.reverse();
		const enrolledThemes = this.context.enrolledThemes;
		const isFiltering = this.context.isFiltering;
		const filteredCourses = this.context.filteredCourses
			.sort((a, b) => new Moment(a.createdDate) - new Moment(b.createdDate))
			.reverse();

		return (
			<div className='container-fluid'>
				{jwt_decode(localStorage.token).roles[0] === "STUDENT" && (
					<div>
						<h4 className='sectionTitle'>Pick a theme:</h4>
						<select
							className='form-control mb-5'
							onChange={(e) => this.context.handleSelect(e.target.value)}
							defaultValue='DEFAULT'>
							<option value='DEFAULT' disabled>
								. . .
							</option>
							{enrolledThemes.map((theme) => (
								<option key={theme.value}>{theme.value}</option>
							))}
						</select>
					</div>
				)}
				{/* <h4 className='sectionTitle'>All courses:</h4> */}
				<div className='row justify-content-center'>
					{isFiltering
						? filteredCourses.map((course) => (
								<CourseCard
									key={course.id}
									course={course}
									handleScores={this.props.handleScores}
								/>
						  ))
						: courses.map((course) => (
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
