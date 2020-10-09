import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import $ from "jquery";
import ThemeContext from "../ThemeContext";
import moment from "moment";
// import axios from "axios";

export class CourseCard extends Component {
	static contextType = ThemeContext;
	state = {
		isStudent:
			localStorage.getItem("token") !== null &&
			jwt_decode(localStorage.token).roles[0] === "STUDENT",
		isInstructor:
			localStorage.getItem("token") !== null &&
			jwt_decode(localStorage.token).roles[0] === "INSTRUCTOR",
		isOwner:
			localStorage.getItem("token") !== null &&
			jwt_decode(localStorage.token).id === this.props.course.createdBy.id,
	};

	handleEnroll = () => {
		this.context.handleEnrollCourse(this.props.course.id);
	};

	handleUnEnroll = () => {
		this.context.handleUnEnrollCourse(this.props.course.id);
	};

	componentDidMount() {
		this.state.isStudent && this.context.getEnrolledCources();
		this.state.isStudent && this.context.getEnrolledThemes();

		// ...
		var max = 70;
		var tot, str;
		$(".card-text").each(function () {
			str = String($(this).html());
			tot = str.length;
			str = tot <= max ? str : str.substring(0, max + 1) + "...";
			$(this).html(str);
		});
	}

	render() {
		let {
			title,
			id,
			picture,
			shortDescription,
			createdDate,
			theme,
		} = this.props.course;

		let a = moment(new Date()); //todays date
		let b = createdDate;
		let date = a.diff(b, "hours");

		const enrolledCourses = this.context.enrolledCourses.filter(
			(course) => course.id === this.props.course.id
		)[0];

		const enrolledThemes = this.context.enrolledThemes.filter(
			(el) => el.value === theme.value
		)[0];

		return (
			<div className='col-auto mb-4 mt-4'>
				<div className='card h-100 shadow-sm' style={{ maxWidth: "326px" }}>
					{!picture ? (
						<svg
							className='bd-placeholder-img card-img-top'
							width='100%'
							// height='225'
							xmlns='http://www.w3.org/2000/svg'
							preserveAspectRatio='xMidYMid slice'
							focusable='false'
							role='img'
							aria-label='Placeholder: Thumbnail'>
							<title>Placeholder</title>
							<rect width='100%' height='100%' fill='#55595c' />
							{/* <text x='50%' y='50%' fill='#eceeef' dy='.3em'>
							{title}
						</text> */}
						</svg>
					) : (
						<div className='img'>
							<img
								src={picture && `https://api.gvclearning.site/img/${picture}`}
								alt='...'
								className='img-thumbnail'
								style={{ maxHeight: "225px", width: "100%" }}
							/>
						</div>
					)}
					<div className='card-body'>
						{date < 24 && (
							<div className='ribbon'>
								<span>NEW</span>
							</div>
						)}
						{this.state.isStudent && enrolledCourses && (
							<span
								// style={{ fontSize: "13px", padding: "10px" }}
								className={
									enrolledCourses.enrollment.status === "IN_PROGRESS"
										? "float-right badge badge-secondary"
										: "float-right badge badge-success"
								}>
								{enrolledCourses.enrollment.status === "IN_PROGRESS"
									? "In progress"
									: "Completed"}
							</span>
						)}
						<h5 className='card-title'>{title}</h5>
						<h6 className='card-title'>{theme.label}</h6>
						<p className='card-text mb-5'>{shortDescription}</p>
						<div className='d-flex justify-content-between align-items-center'>
							<div
								className='btn-group'
								style={{ position: "absolute", bottom: "20px" }}>
								{this.state.isStudent &&
									enrolledCourses &&
									enrolledThemes &&
									enrolledThemes.status === "ACCEPTED" && (
										// isEnrolledToTheme.length !== 0 &&
										// isEnrolledToTheme[0].status === "ACCEPTED" &&
										<Link to={`/article${id}`}>
											<button
												type='button'
												className='btn btn-sm btn-outline-secondary mr-1'>
												View
											</button>
										</Link>
									)}
								{this.state.isInstructor && this.state.isOwner && (
									<Link to={`/article${id}`}>
										<button
											type='button'
											className='btn btn-sm btn-outline-secondary mr-1'>
											View
										</button>
									</Link>
								)}
								{/* {this.state.isOwner && (
									<button
										type='button'
										className='btn btn-sm btn-outline-secondary mr-1'
										onClick={() => this.props.handleScores(id)}>
										Scores
									</button>
								)} */}

								{jwt_decode(localStorage.token).roles[0] !== "INSTRUCTOR" && (
									<div>
										{enrolledCourses ? (
											<button
												type='button'
												className='btn btn-sm btn-outline-secondary'
												onClick={this.handleUnEnroll}>
												Unsubscribe
											</button>
										) : (
											enrolledThemes &&
											enrolledThemes.status === "ACCEPTED" && (
												<button
													type='button'
													className='btn btn-sm btn-outline-secondary'
													onClick={this.handleEnroll}>
													Subscribe
												</button>
											)
										)}
									</div>
								)}
							</div>
							<small
								className='text-muted'
								style={{ position: "absolute", bottom: "20px", right: "10px" }}>
								{moment(createdDate).format("MMM Do YY")}
							</small>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CourseCard;
