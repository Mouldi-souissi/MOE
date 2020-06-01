import React, { Component } from "react";
import Loader from "./Loader";
import AdminLi from "./AdminLi";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import ModalAdmin from "./ModalAdmin";
import UserContext from "../UserContext";
import AdminEnrollLi from "./AdminEnrollLi";

export class Admin extends Component {
	static contextType = UserContext;
	state = {
		search: "",
	};

	componentDidMount() {
		this.context.getAllUsers();
		this.context.getThemesEnrollement();
	}

	render() {
		if (jwt_decode(localStorage.token).sub !== "admin@moe.com") {
			return <Redirect to='/signIn' />;
		}
		const students = this.context.students;
		const instructors = this.context.instructors;
		// let filteredStudents =
		// 	students &&
		// 	students.filter((el) =>
		// 		el.firstName
		// 			.trim()
		// 			.toLocaleLowerCase()
		// 			.includes(this.state.search.trim().toLocaleLowerCase())
		// 	);
		// let filteredInstructors =
		// 	instructors &&
		// 	instructors.filter((el) =>
		// 		el.firstName
		// 			.trim()
		// 			.toLocaleLowerCase()
		// 			.includes(this.state.search.trim().toLocaleLowerCase())
		// 	);
		const enrollments = this.context.enrollments;
		return (
			<div className='admin'>
				{students.length === 0 ? (
					<Loader />
				) : (
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
									<ul className='nav nav-tabs'>
										<li className='nav-item'>
											<div
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
										<li className='nav-item'>
											<div
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
										<li className='nav-item'>
											<div
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
									</ul>
									<div className='tab-content'>
										<div className='tab-pane active' role='tabpanel' id='tab-1'>
											<div className='thread-list-head'>
												<nav className='thread-pages mb-2'>
													<ul className='pagination'>
														<li className='page-item'>
															<div
																className='page-link'
																href='#'
																aria-label='Previous'>
																<span aria-hidden='true'>«</span>
															</div>
														</li>
														<li className='page-item'>
															<div className='page-link' href='#'>
																1
															</div>
														</li>
														<li className='page-item'>
															<div className='page-link' href='#'>
																2
															</div>
														</li>
														<li className='page-item'>
															<div className='page-link' href='#'>
																3
															</div>
														</li>
														<li className='page-item'>
															<div className='page-link' href='#'>
																4
															</div>
														</li>
														<li className='page-item'>
															<div className='page-link' href='#'>
																5
															</div>
														</li>
														<li className='page-item'>
															<div
																className='page-link'
																href='#'
																aria-label='Next'>
																<span aria-hidden='true'>»</span>
															</div>
														</li>
													</ul>
												</nav>
											</div>
											<ModalAdmin reload={this.reload} />
											<div className='table-responsive-sm'>
												<table className='table table-hover  table-bordered table-list'>
													<thead>
														<tr align='center'>
															<th scope='col'></th>
															<th scope='col'>Created</th>
															<th scope='col'>First Name</th>
															<th scope='col'>Last Name</th>
															<th scope='col'>E-mail</th>
															<th scope='col'>State</th>

															<th scope='col'>
																<em className='fa fa-cog'></em>
															</th>
														</tr>
													</thead>
													{students.map((user, key) => (
														<AdminLi key={key} user={user} role='student' />
													))}
												</table>
											</div>
										</div>
										<div className='tab-pane' role='tabpanel' id='tab-2'>
											<table className='table table-hover  table-bordered table-list'>
												<thead>
													<tr align='center'>
														<th scope='col'></th>
														<th scope='col'>Created</th>
														<th scope='col'>First Name</th>
														<th scope='col'>Last Name</th>
														<th scope='col'>E-mail</th>
														<th scope='col'>State</th>

														<th scope='col'>
															<em className='fa fa-cog'></em>
														</th>
													</tr>
												</thead>
												{instructors.map((user, key) => (
													<AdminLi key={key} user={user} role='instructor' />
												))}
											</table>
										</div>
										<div className='tab-pane' role='tabpanel' id='tab-3'>
											<table className='table table-hover  table-bordered table-list'>
												<thead>
													<tr align='center'>
														<th scope='col'></th>
														<th scope='col'>Student</th>
														<th scope='col'>Theme</th>
														<th scope='col'>Status</th>

														<th scope='col'>
															<em className='fa fa-cog'></em>
														</th>
													</tr>
												</thead>
												{enrollments &&
													enrollments.map((enroll, i) => (
														<AdminEnrollLi key={i} enroll={enroll} />
													))}
											</table>
										</div>
										<div className='tab-pane' role='tabpanel' id='tab-4'></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Admin;
