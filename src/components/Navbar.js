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
		window.location.reload(false);
	};

	componentDidMount() {
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

		if (localStorage.getItem("token")) {
			this.context.getProfile();
		}

		// $(".nav li").click(function () {
		// 	if ($(".nav li").removeClass("active")) {
		// 		$(this).removeClass("active");
		// 	}
		// 	$(this).addClass("active");
		// });
	}

	render() {
		const picture = this.context.profile.picture;
		const name = this.context.profile.firstName;
		return (
			<nav className='navbar navbar-light navbar-expand-lg'>
				<div className='container-fluid'>
					<Link className='navbar-brand font-weight-bold' to='/'>
						{/* <div className='layer' /> */}
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
										activeClassName='active'>
										HOME
									</NavLink>
								</li>
								{localStorage.getItem("token") !== null && (
									<li id='courses' className='nav-item' role='presentation'>
										<NavLink
											className='nav-link'
											to='/courses'
											activeClassName='active'>
											COURSES
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
										activeClassName='active'>
										DASHBOARD
									</NavLink>
								</li>
								<li id='contact' className='nav-item' role='presentation'>
									<NavLink
										className='nav-link'
										to='/aboutUs'
										activeClassName='active'>
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
											jwt_decode(localStorage.token).sub === "admin@moe.com"
												? "/admin"
												: jwt_decode(localStorage.token).roles[0] ===
												  "INSTRUCTOR"
												? "/dashboardI"
												: "/dashboard"
										}>
										<div className='avatar-nav'>
											{picture && (
												<img
													alt='img'
													src={`https://app.visioconf.site/img/${picture}`}
												/>
											)}
											<i
												className='fa fa-circle greenDot'
												aria-hidden='true'></i>
										</div>
									</Link>
									<div className='nav-link'>{name}</div>
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
									<Link to='/signUp' activeClassName='active'>
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
