import React, { Component } from "react";
import Courses from "./Courses";
import $ from "jquery";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Joinbbb from "./Joinbbb";
import Profile from "./Profile";
import Exams from "./Exams";
import ProfileContext from "../ProfileContext";

export class Dashboard extends Component {
	static contextType = ProfileContext;

	componentDidMount() {
		// toggling btn
		$("#menu-toggle").click(function (e) {
			e.preventDefault();
			$("#wrapper").toggleClass("toggled");
		});
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
		return (
			<Tabs>
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
										<i className='fa fa-film mr-3' aria-hidden='true' />
										Join Live room
									</Tab>
									<Tab>
										<i className='fa fa-leanpub mr-3' aria-hidden='true' />
										Exams
									</Tab>
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
							{/* <CoursesInterface /> */}
						</TabPanel>
						<TabPanel>
							<Joinbbb />
						</TabPanel>
						<TabPanel>
							<Exams />
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
