import React, { Component } from "react";
import Courses from "./Courses";
import $ from "jquery";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Profile from "./Profile";
import ProfileContext from "../ProfileContext";
import MyThemes from "./MyThemes";

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
										<i className='fa fa-book mr-3' aria-hidden='true' />
										My Themes
									</Tab>
									<Tab>
										<i className='fa fa-bell mr-3' aria-hidden='true' />
										My Notifications
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
						</TabPanel>
						<TabPanel>
							<MyThemes />
						</TabPanel>
						<TabPanel> My Notifications</TabPanel>
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
