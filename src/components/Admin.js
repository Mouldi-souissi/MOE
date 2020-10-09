import React, { Component } from "react";
import Loader from "./Loader";
import AdminLi from "./AdminLi";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import ModalAdmin from "./ModalAdmin";
import UserContext from "../UserContext";
import AdminEnrollLi from "./AdminEnrollLi";
import { v4 as uuidv4 } from "uuid";
import CourseLi from "./CourseLi";
import $ from "jquery";
import Pagination from "./Pagination";
const Moment = require("moment");

export class Admin extends Component {
	static contextType = UserContext;
	state = {
		search: "",
		currentPage: 1,
		postsPerPage: 10,
	};

	componentDidMount() {
		this.context.getAllUsers();
		this.context.getThemesEnrollement();
		this.context.getAllCourses();
		$(document).ready(function () {
			var activeTab = localStorage.getItem("activeTab");
			if (activeTab) {
				return $('#myTab div[href="' + activeTab + '"]').click();
			}
		});
	}

	render() {
		if (jwt_decode(localStorage.token).roles[0] !== "ADMIN") {
			return <Redirect to='/signIn' />;
		}
		const students = this.context.students
			.sort((a, b) => new Moment(a.createdDate) - new Moment(b.createdDate))
			.reverse();
		const instructors = this.context.instructors
			.sort((a, b) => new Moment(a.createdDate) - new Moment(b.createdDate))
			.reverse();
		let courses = this.context.courses
			.sort((a, b) => new Moment(a.createdDate) - new Moment(b.createdDate))
			.reverse();

		if (jwt_decode(localStorage.token).sub !== "administrator@gvc.com") {
			courses = courses.filter(
				(course) =>
					course.theme.label === jwt_decode(localStorage.token).firstName
			);
		}

		console.log(jwt_decode(localStorage.token).firstName, "aaaaa");

		let filteredCourses =
			courses &&
			courses.filter(
				(el) =>
					el.title
						.trim()
						.toLocaleLowerCase()
						.includes(this.state.search.trim().toLocaleLowerCase()) ||
					el.createdBy.lastName
						.trim()
						.toLocaleLowerCase()
						.includes(this.state.search.trim().toLocaleLowerCase()) ||
					el.createdBy.firstName
						.trim()
						.toLocaleLowerCase()
						.includes(this.state.search.trim().toLocaleLowerCase())
			);
		let filteredStudents =
			students &&
			students.filter(
				(el) =>
					el.firstName
						.trim()
						.toLocaleLowerCase()
						.includes(this.state.search.trim().toLocaleLowerCase()) ||
					el.lastName
						.trim()
						.toLocaleLowerCase()
						.includes(this.state.search.trim().toLocaleLowerCase())
			);
		let filteredInstructors =
			instructors &&
			instructors.filter(
				(el) =>
					el.firstName
						.trim()
						.toLocaleLowerCase()
						.includes(this.state.search.trim().toLocaleLowerCase()) ||
					el.lastName
						.trim()
						.toLocaleLowerCase()
						.includes(this.state.search.trim().toLocaleLowerCase())
			);
		const enrollments = this.context.enrollments.sort(function (a, b) {
			var nameA = a.student.firstName.toUpperCase(); // ignore upper and lowercase
			var nameB = b.student.firstName.toUpperCase(); // ignore upper and lowercase
			if (nameA < nameB) {
				return -1; //nameA comes first
			}
			if (nameA > nameB) {
				return 1; // nameB comes first
			}
			return 0; // names must be equal
		});
		let filteredThemesByStudent =
			enrollments &&
			enrollments.filter(
				(el) =>
					el.student.firstName
						.trim()
						.toLocaleLowerCase()
						.includes(this.state.search.trim().toLocaleLowerCase()) ||
					el.student.lastName
						.trim()
						.toLocaleLowerCase()
						.includes(this.state.search.trim().toLocaleLowerCase())
			);
		const loader = this.context.loader;

		const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
		const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
		const currentCourses = filteredCourses.slice(
			indexOfFirstPost,
			indexOfLastPost
		);
		const currentStudents = filteredStudents.slice(
			indexOfFirstPost,
			indexOfLastPost
		);
		const currentInstructors = filteredInstructors.slice(
			indexOfFirstPost,
			indexOfLastPost
		);
		const currentThemes = filteredThemesByStudent.slice(
			indexOfFirstPost,
			indexOfLastPost
		);

		// Change page
		const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

		return (
			<div className='admin'>
				{!loader && <Loader />}
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<form>
								<div className='form-group'>
									<div className='input-group'>
										<span className='input-group-addon'>
											<i className='fa fa-search'></i>
										</span>
										<input
											className='form-control'
											type='search'
											name='search'
											placeholder="Type user's first name"
											onChange={(e) =>
												this.setState({ search: e.target.value })
											}
										/>
									</div>
								</div>
							</form>
							<div>
								<ul className='nav nav-tabs' id='myTab'>
									{jwt_decode(localStorage.token).sub ===
										"administrator@gvc.com" && (
										<li className='nav-item'>
											<div
												onClick={(e) =>
													localStorage.setItem(
														"activeTab",
														e.target.getAttribute("name")
													)
												}
												name='#tab-1'
												className='nav-link active'
												role='tab'
												data-toggle='tab'
												href='#tab-1'>
												Students&nbsp;
												<span className='badge badge-pill badge-primary'>
													{students.length}
												</span>
											</div>
										</li>
									)}
									{jwt_decode(localStorage.token).sub ===
										"administrator@gvc.com" && (
										<li className='nav-item'>
											<div
												onClick={(e) =>
													localStorage.setItem(
														"activeTab",
														e.target.getAttribute("name")
													)
												}
												name='#tab-2'
												className='nav-link'
												role='tab'
												data-toggle='tab'
												href='#tab-2'>
												Instructors&nbsp;
												<span className='badge badge-pill badge-primary'>
													{instructors.length}
												</span>
											</div>
										</li>
									)}
									{jwt_decode(localStorage.token).sub ===
										"administrator@gvc.com" && (
										<li className='nav-item'>
											<div
												onClick={(e) =>
													localStorage.setItem(
														"activeTab",
														e.target.getAttribute("name")
													)
												}
												name='#tab-3'
												className='nav-link'
												role='tab'
												data-toggle='tab'
												href='#tab-3'>
												Themes&nbsp;
												<span className='badge badge-pill badge-primary'>
													{enrollments.length}
												</span>
											</div>
										</li>
									)}

									<li className='nav-item'>
										<div
											onClick={(e) =>
												localStorage.setItem(
													"activeTab",
													e.target.getAttribute("name")
												)
											}
											name='#tab-4'
											className='nav-link'
											role='tab'
											data-toggle='tab'
											href='#tab-4'>
											Courses&nbsp;
											<span className='badge badge-pill badge-primary'>
												{courses.length}
											</span>
										</div>
									</li>
								</ul>
								<div className='tab-content'>
									{jwt_decode(localStorage.token).sub ===
										"administrator@gvc.com" && (
										<div className='tab-pane active' role='tabpanel' id='tab-1'>
											<ModalAdmin reload={this.reload} />
											<div className='table-responsive-sm mt-2'>
												<table className='table table-hover  table-bordered table-list'>
													<thead>
														<tr align='center'>
															<th scope='col'></th>
															<th scope='col'>Created</th>
															<th scope='col'>First Name</th>
															<th scope='col'>Last Name</th>
															<th scope='col'>E-mail</th>
															<th scope='col'>State</th>
															<th scope='col'>Last Connection</th>
															<th scope='col'>Reset Password</th>
															<th scope='col'>
																<em className='fa fa-cog'></em>
															</th>
														</tr>
													</thead>
													{currentStudents.map((user) => (
														<AdminLi key={user.id} user={user} role='student' />
													))}
												</table>
												<Pagination
													postsPerPage={this.state.postsPerPage}
													totalPosts={filteredStudents.length}
													paginate={paginate}
												/>
											</div>
										</div>
									)}
									{jwt_decode(localStorage.token).sub ===
										"administrator@gvc.com" && (
										<div className='tab-pane' role='tabpanel' id='tab-2'>
											<div className='table-responsive-sm mt-2'>
												<table className='table table-hover  table-bordered table-list'>
													<thead>
														<tr align='center'>
															<th scope='col'></th>
															<th scope='col'>Created</th>
															<th scope='col'>First Name</th>
															<th scope='col'>Last Name</th>
															<th scope='col'>E-mail</th>
															<th scope='col'>State</th>
															<th scope='col'>Last Connection</th>
															<th scope='col'>Reset Password</th>
															<th scope='col'>
																<em className='fa fa-cog'></em>
															</th>
														</tr>
													</thead>
													{currentInstructors.map((user) => (
														<AdminLi
															key={user.id}
															user={user}
															role='instructor'
														/>
													))}
												</table>
												<Pagination
													postsPerPage={this.state.postsPerPage}
													totalPosts={filteredInstructors.length}
													paginate={paginate}
												/>
											</div>
										</div>
									)}
									{jwt_decode(localStorage.token).sub ===
										"administrator@gvc.com" && (
										<div className='tab-pane' role='tabpanel' id='tab-3'>
											<div className='table-responsive-sm mt-2'>
												<table className='table table-hover  table-bordered table-list'>
													<thead>
														<tr align='center'>
															<th scope='col'></th>
															<th scope='col'>Student</th>
															<th scope='col'>E-mail</th>
															<th scope='col'>Theme</th>
															<th scope='col'>Status</th>

															<th scope='col'>
																<em className='fa fa-cog'></em>
															</th>
														</tr>
													</thead>
													{currentThemes.map((enroll) => (
														<AdminEnrollLi key={uuidv4()} enroll={enroll} />
													))}
												</table>
												<Pagination
													postsPerPage={this.state.postsPerPage}
													totalPosts={filteredThemesByStudent.length}
													paginate={paginate}
												/>
											</div>
										</div>
									)}
									<div className='tab-pane' role='tabpanel' id='tab-4'>
										<div className='table-responsive-sm mt-2'>
											<table className='table table-hover  table-bordered table-list'>
												<thead>
													<tr align='center'>
														<th scope='col'>Title</th>
														<th scope='col'>Created By</th>
														<th scope='col'>Theme</th>
														<th scope='col'>Sessions Stats</th>
														<th scope='col'>Course Stats</th>
														<th scope='col'>Exams</th>
													</tr>
												</thead>
												{currentCourses.map((course) => (
													<CourseLi key={course.id} course={course} />
												))}
											</table>
											<Pagination
												postsPerPage={this.state.postsPerPage}
												totalPosts={filteredCourses.length}
												paginate={paginate}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Admin;
