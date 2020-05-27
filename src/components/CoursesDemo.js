import React, { Component } from "react";
import ThemeCard from "./ThemeCard";
import CourseCard from "./CourseCard";
import ThemeContext from "../ThemeContext";
const Moment = require("moment");

export class CoursesDemo extends Component {
	static contextType = ThemeContext;

	componentDidMount() {
		this.context.getAllThemes();
		this.context.getAllCourses();
	}

	render() {
		const themes = this.context.themes;
		const courses = this.context.courses
			.sort((a, b) => new Moment(a.createdDate) - new Moment(b.createdDate))
			.reverse();
		return (
			<div className='demo'>
				<div className='bg'></div>
				<div className='bg bg2'></div>
				<div className='bg bg3'></div>

				<h4 className='center sectionTitle' style={{ color: "white" }}>
					Themes: (Please Subscribe to a Theme)
				</h4>

				<div className='container-fluid'>
					<div className='row justify-content-center'>
						{themes.map((theme) => (
							<ThemeCard key={theme.label} theme={theme} />
						))}
					</div>
				</div>

				<h4 className='center sectionTitle' style={{ color: "white" }}>
					Courses:
				</h4>

				<div className='container-fluid'>
					<div className='row justify-content-center'>
						{courses.map((course) => (
							<CourseCard key={course.id} course={course} />
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default CoursesDemo;
