import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import ProfileContext from "../ProfileContext";

export class SignIn extends Component {
	static contextType = ProfileContext;
	state = {
		email: "",
		password: "",
		alert: "",
	};

	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSignIn = (e) => {
		e.preventDefault();
		let { email, password } = this.state;
		axios
			.post("https://api.gvclearning.site/api/auth", { email, password })
			.then((res) => {
				if (res.status !== 200) {
					this.setState({ alert: "invalid credentials" });
				} else {
					localStorage.setItem("token", res.headers.authorization);
					this.context.getProfile();
					const decoded = jwt_decode(localStorage.token);
					if (decoded.roles[0] !== "ADMIN") {
						if (decoded.roles[0] === "INSTRUCTOR") {
							this.props.history.push(`/dashboardI`);
						} else this.props.history.push(`/dashboard`);
					} else this.props.history.push("/admin");
				}
			})
			.catch((err) => {
				if (err.response.data.status) {
					this.setState({ alert: "invalid credentials" });
					setTimeout(() => {
						this.setState({
							...this.state,
							alert: "",
						});
					}, 3000);
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
						{this.state.alert && (
							<p className='alert alert-danger'>{this.state.alert}</p>
						)}
						<div className='form-group d-flex align-items-center'>
							<i className='fa fa-envelope mr-3' aria-hidden='true'></i>
							<input
								className='form-control'
								type='email'
								name='email'
								placeholder='Email'
								onChange={this.handleInput}
								maxLength='50'
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
							If you don't have an account!
						</div>
						<p
							className='already center text-muted mt-3'
							style={{ fontSize: "10px" }}>
							If you have forgot your password please contact live support
						</p>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(SignIn);
