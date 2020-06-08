import React, { Component } from "react";
import Courses from "./Courses";
import $ from "jquery";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Profile from "./Profile";
import ProfileContext from "../ProfileContext";
import MyThemes from "./MyThemes";
import Notifications from "./Notifications";
import axios from "axios";
import moment from "moment";
import MyExams from "./MyExams";
// import { generatePath } from "react-router";

export class Dashboard extends Component {
	static contextType = ProfileContext;

	state = {
		courses: [],
		tabIndex: 0,
	};

	changeTab = () => {
		this.setState({ tabIndex: 3 });
	};

	getEnrolledThemes = () => {
		axios({
			url: "https://app.visioconf.site/api/v1/users/themes/enrollments",
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				let filtered = res.data.payload.filter(
					(el) => el.status === "ACCEPTED"
				);
				console.log(filtered);
				filtered.forEach((theme) =>
					axios({
						url: `https://app.visioconf.site/api/v1/courses?theme=${theme.value}`,
						method: "GET",
						headers: { authorization: localStorage.getItem("token") },
					})
						.then((res) => {
							this.setState({
								courses: this.state.courses.concat(res.data.payload),
							});
						})
						.catch((err) => {
							console.log(err);
						})
				);
			})
			.catch((err) => console.log(err));
	};

	componentDidMount() {
		// toggling btn
		$("#menu-toggle").click(function (e) {
			e.preventDefault();
			$("#wrapper").toggleClass("toggled");
		});

		this.getEnrolledThemes();

		// generatePath("/dashboard:index", {
		// 	id: 3,
		// });
	}

	handleLogout = () => {
		window.localStorage.removeItem("token");
		this.props.history.push("/");
		window.location.reload(false);
	};
	render() {
		if (jwt_decode(localStorage.token).roles[0] === "ADMIN") {
			this.props.history.push("/admin");
		}
		const picture = this.context.profile.picture;

		let date = moment(new Date()); //todays date
		let newCourses = this.state.courses.filter(
			(course) => Math.abs(moment(course.createdDate).diff(date, "hours")) < 24
		);

		return (
			<Tabs
				selectedIndex={this.state.tabIndex}
				onSelect={(tabIndex) => this.setState({ tabIndex })}>
				<div className='innerbody'>
					<div id='wrapper'>
						<div id='sidebar-wrapper'>
							<div className='innerSidebar'>
								<div
									className='btn btn-link'
									role='button'
									id='menu-toggle'
									href='#sidebar-wrapper'></div>
								<TabList>
									<div className='avatar-dash ml-4'>
										<div className='avatar-bg-dash'>
											{picture && (
												<img
													alt='img'
													src={`https://app.visioconf.site/img/${picture}`}
												/>
											)}
										</div>
									</div>
									<Tab>
										<i
											className='fa fa-graduation-cap mr-3'
											aria-hidden='true'
										/>
										My Courses
									</Tab>
									<Tab>
										<i className='fa fa-book mr-3' aria-hidden='true' />
										My Themes
									</Tab>
									<Tab>
										<i className='fa fa-leanpub mr-3' aria-hidden='true' />
										My Exams
									</Tab>
									<Tab>
										<i className='fa fa-bell mr-3' aria-hidden='true' />
										My Notifications
									</Tab>
									{newCourses.length !== 0 && (
										<span className='badge badge-secondary'>
											{newCourses.length}
										</span>
									)}

									<br />
									<Tab>
										<button className='btn btn-primary btnTab'>
											<i
												className='fa fa-cog mr-1'
												aria-hidden='true'
												style={{ color: "white" }}
											/>
											Profile
										</button>
									</Tab>
									<button
										type='button'
										className='btn btn-success btnTab'
										onClick={this.handleLogout}>
										<i
											className='fa fa-sign-out mr-1'
											aria-hidden='true'
											style={{ color: "white" }}
										/>
										Exit
									</button>
								</TabList>
							</div>
						</div>

						<TabPanel>
							<Courses />
						</TabPanel>
						<TabPanel>
							<MyThemes />
						</TabPanel>
						<TabPanel>
							<MyExams />
						</TabPanel>
						<TabPanel>
							<Notifications newCourses={newCourses} />
						</TabPanel>
						<TabPanel>
							<Profile />
						</TabPanel>
					</div>
				</div>
			</Tabs>
		);
	}
}

export default withRouter(Dashboard);
