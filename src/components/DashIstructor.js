import React, { Component } from "react";
import $ from "jquery";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";
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

									{/* <Tab>
										<i className='fa fa-leanpub mr-3' aria-hidden='true' />
										Exams
									</Tab> */}
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
										className='btn btn-success btnTab-i'
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
						{/* <TabPanel></TabPanel> */}
						<TabPanel>
							<Profile />
						</TabPanel>
					</div>
				</div>
			</Tabs>

			// <div class='wrapper'>
			// 	<main></main>
			// 	<sidebar>
			// 		<div class='avatar'>
			// 			<div class='avatar__img'>
			// 				<img src='https://picsum.photos/70' alt='avatar' />
			// 			</div>
			// 			<div class='avatar__name'>John Smith</div>
			// 		</div>

			// 		<nav class='menu'>
			// 			<a class='menu__item' href='#'>
			// 				<i class='menu__icon fa fa-home'></i>
			// 				<span class='menu__text'>overview</span>
			// 			</a>
			// 			<a class='menu__item' href='#'>
			// 				<i class='menu__icon fa fa-envelope'></i>
			// 				<span class='menu__text'>messages</span>
			// 			</a>
			// 			<a class='menu__item' href='#'>
			// 				<i class='menu__icon fa fa-list'></i>
			// 				<span class='menu__text'>workout</span>
			// 			</a>
			// 			<a class='menu__item menu__item--active' href='#'>
			// 				<i class='menu__icon fa fa-calendar'></i>
			// 				<span class='menu__text'>calendar</span>
			// 			</a>
			// 			<a class='menu__item' href='#'>
			// 				<i class='menu__icon fa fa-bar-chart'></i>
			// 				<span class='menu__text'>goals</span>
			// 			</a>
			// 			<a class='menu__item' href='#'>
			// 				<i class='menu__icon fa fa-trophy'></i>
			// 				<span class='menu__text'>achivements</span>
			// 			</a>
			// 			<a class='menu__item' href='#'>
			// 				<i class='menu__icon fa fa-sliders'></i>
			// 				<span class='menu__text'>measurements</span>
			// 			</a>
			// 		</nav>
			// 	</sidebar>
			// </div>
		);
	}
}

export default withRouter(DashIstructor);
