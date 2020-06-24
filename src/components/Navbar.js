import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router";
import jwt_decode from "jwt-decode";
import $ from "jquery";
import ProfileContext from "../ProfileContext";
import logoE from "../assets/logoE.png";

export class Navbar extends Component {
	static contextType = ProfileContext;

	handleLogout = () => {
		window.localStorage.removeItem("token");
		this.props.history.push("/");
		// window.location.reload(false);
	};

	componentDidMount() {
		if (localStorage.getItem("token")) {
			this.context.getProfile();
		}

		function checkScroll() {
			var startY = $(".navbar").height() * 2; //The point where the navbar changes in px

			if ($(window).scrollTop() > startY) {
				$(".navbar").addClass("scrolled");
			} else {
				$(".navbar").removeClass("scrolled");
			}
		}

		if ($(".navbar").length > 0) {
			$(window).on("scroll load resize", function () {
				checkScroll();
			});
		}

		$(window).click(function (e) {
			if ($(".navbar-collapse").hasClass("show")) {
				$(".navbar-collapse").removeClass("show");
				e.preventDefault();
			}
		});
		$(".navbar-collapse").click(function (event) {
			event.stopPropagation();
		});
	}

	render() {
		const profile = this.context.profile;

		return (
			<nav className='navbar navbar-light navbar-expand-lg'>
				<div className='container-fluid'>
					<Link className='navbar-brand font-weight-bold' to='/'>
						<img alt='logo' src={logoE} className='logoE' />
					</Link>
					<button
						data-toggle='collapse'
						className='navbar-toggler'
						data-target='#navcol-1'>
						<span className='sr-only'>Toggle navigation</span>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navcol-1'>
						<div className='pl-2'>
							<ul className='nav navbar-nav'>
								<li id='home' className='nav-item' role='presentation'>
									<NavLink
										exact
										className='nav-link'
										to='/'
										activeclassname='active'>
										HOME
									</NavLink>
								</li>
								{localStorage.getItem("token") !== null && (
									<li id='courses' className='nav-item' role='presentation'>
										<NavLink
											className='nav-link'
											to='/courses'
											activeclassname='active'>
											THEMES & COURSES
										</NavLink>
									</li>
								)}

								<li id='dashboard' className='nav-item' role='presentation'>
									<NavLink
										className='nav-link'
										to={
											localStorage.getItem("token") !== null &&
											jwt_decode(localStorage.token).roles[0] === "INSTRUCTOR"
												? "/dashboardI"
												: "/dashboard"
										}
										activeclassname='active'>
										DASHBOARD
									</NavLink>
								</li>
								<li id='contact' className='nav-item' role='presentation'>
									<NavLink
										className='nav-link'
										to='/aboutUs'
										activeclassname='active'>
										CONTACT US
									</NavLink>
								</li>
							</ul>
						</div>
						<div role='navigation' className='mt-3 mt-lg-0 mt-md-0 ml-auto p-2'>
							{localStorage.getItem("token") !== null ? (
								<div className='d-flex'>
									<Link
										to={
											jwt_decode(localStorage.token).roles[0] !== "ADMIN"
												? "/admin"
												: jwt_decode(localStorage.token).roles[0] ===
												  "INSTRUCTOR"
												? "/dashboardI"
												: "/dashboard"
										}>
										<div className='avatar-nav'>
											{profile.picture && (
												<img
													alt='img'
													src={`https://gvclearning.site/img/${profile.picture}`}
												/>
											)}
											<i
												className='fa fa-circle greenDot'
												aria-hidden='true'></i>
										</div>
									</Link>
									<div className='nav-link'>{profile.firstName}</div>
									<button
										className='btn btn-success'
										type='button'
										onClick={this.handleLogout}>
										<i
											className='fa fa-sign-out mr-1'
											aria-hidden='true'
											style={{ color: "white" }}
										/>
										Exit
									</button>
								</div>
							) : (
								<div className='d-flex'>
									<Link to='/signIn'>
										<button
											className='btn btn-outline-primary mr-1'
											type='button'>
											Sign In
										</button>
									</Link>
									<Link to='/signUp'>
										<button className='btn btn-primary' type='button'>
											Sign up
										</button>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

export default withRouter(Navbar);
