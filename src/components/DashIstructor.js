import React, { Component } from "react";
import $ from "jquery";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import BigBlue from "./BigBlue";
import Joinbbb from "./Joinbbb";
import Profile from "./Profile";
import FormSteps from "./FormSteps";
import Courses from "./Courses";
import axios from "axios";
import ProfileContext from "../ProfileContext";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export class DashIstructor extends Component {
	static contextType = ProfileContext;
	state = {
		tabIndex: 0,
		img: "",
		exams: [],
	};

	changeTab = () => {
		this.setState({ tabIndex: 3 });
	};

	componentDidMount() {
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

	handleScores = (id) => {
		axios({
			url: `http://91.134.133.143:9090/api/v1/courses/${id}/exams`,
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					exams: res.data.payload,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	render() {
		if (jwt_decode(localStorage.token).roles[0] !== "INSTRUCTOR") {
			this.props.history.push("/dashboard");
		}
		const picture = this.context.profile.picture;
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
										<i className='fa fa-plus mr-3' aria-hidden='true'></i>
										Add Course
									</Tab>
									<Tab>
										<i
											className='fa fa-graduation-cap mr-3'
											aria-hidden='true'
										/>
										My Courses
									</Tab>
									<Tab>
										<i className='fa fa-video-camera mr-3' aria-hidden='true' />
										Create Live Room
									</Tab>
									<Tab>
										<i className='fa fa-film mr-3' aria-hidden='true' />
										Join Live Room
									</Tab>
									<Tab>
										<i className='fa fa-folder mr-3' aria-hidden='true' />
										Recorded Sessions
									</Tab>
									<Tab>
										<i className='fa fa-leanpub mr-3' aria-hidden='true' />
										Exams
									</Tab>
									<br />
									<Tab>
										<button className='btn btn-primary btnTab-i'>
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
										className='btn btn-success btnTab-i '
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
							<FormSteps />
						</TabPanel>
						<TabPanel>
							<Courses handleScores={this.handleScores} />
						</TabPanel>
						<TabPanel>
							<BigBlue changeTab={this.changeTab} />
						</TabPanel>
						<TabPanel>
							<Joinbbb />
						</TabPanel>
						<TabPanel>recorded</TabPanel>
						<TabPanel>{/* <Exams /> */}</TabPanel>
						<TabPanel>
							<Profile />
						</TabPanel>
					</div>
				</div>
			</Tabs>
		);
	}
}

export default withRouter(DashIstructor);
