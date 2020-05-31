import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

export class SignIn extends Component {
	state = {
		email: "",
		password: "",
	};

	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSignIn = (e) => {
		e.preventDefault();
		let { email, password } = this.state;
		axios
			.post("https://app.visioconf.site/api/auth", { email, password })
			.then((res) => {
				if (res.status !== 200) alert("invalid credentials");
				else {
					localStorage.setItem("token", res.headers.authorization);
					const decoded = jwt_decode(localStorage.token);
					console.log(decoded.roles);
					if (decoded.sub !== "admin@moe.com") {
						if (decoded.roles[0] === "INSTRUCTOR") {
							this.props.history.push(`/dashboardI`);
						} else this.props.history.push(`/dashboard`);
					} else this.props.history.push("/admin");
				}
			});
	};

	render() {
		return (
			<div>
				<div className='login-clean'>
					<form onSubmit={(e) => this.handleSignIn(e)}>
						<h3 className='text-center mb-3'>Sign In</h3>
						<div className='avatar-bg-dash'></div>

						<div className='form-group d-flex align-items-center'>
							<i className='fa fa-envelope mr-3' aria-hidden='true'></i>
							<input
								className='form-control'
								type='email'
								name='email'
								placeholder='Email'
								onChange={this.handleInput}
								maxLength='20'
								required
							/>
						</div>
						<div className='form-group d-flex align-items-center'>
							<i className='fa fa-unlock-alt mr-3' aria-hidden='true'></i>
							<input
								className='form-control'
								type='password'
								name='password'
								placeholder='Password'
								onChange={this.handleInput}
								maxLength='20'
								required
							/>
						</div>
						<div className='form-group'>
							<button type='submit' className='btn btn-primary btn-block'>
								Log In
							</button>
						</div>
						<div className='already center'>
							<Link to='/signUp'> Sign up </Link>
							if you don't have an account!
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(SignIn);
