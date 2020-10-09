import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

export class SignUp extends Component {
	state = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		matchingPassword: "",
		role: "student",
		err: "",
	};

	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSignUp = (e) => {
		e.preventDefault();
		this.setState({ email: this.state.email.toLowerCase() });
		if (this.state.password === this.state.matchingPassword) {
			axios
				.post(
					`https://api.gvclearning.site/api/v1/public/signup/${this.state.role}`,
					this.state
				)
				.then((res) => {
					this.props.history.push("/welcome");
				})
				.catch((err) => {
					console.log(err.response.data.status);
					if (err.response.data.status === "DUPLICATE_ENTITY") {
						this.setState({
							err: "This user is already registered !",
						});
						setTimeout(() => {
							this.setState({
								...this.state,
								err: "",
							});
						}, 3000);
					}
				});
		} else {
			this.setState({ err: "Passwords should match !" });
			setTimeout(() => {
				this.setState({
					...this.state,
					err: "",
				});
			}, 3000);
		}
	};

	render() {
		return (
			<div>
				<div className='register-photo'>
					<div className='form-container'>
						<div className='image-holder'></div>
						<form onSubmit={(e) => this.handleSignUp(e)}>
							<h2 className='text-center'>
								<strong>Create</strong> an account.
							</h2>
							{this.state.err && (
								<div class='alert alert-danger alertBox w-100' role='alert'>
									{this.state.err}
								</div>
							)}

							<div className='form-group'>
								<input
									className='form-control'
									type='text'
									name='firstName'
									placeholder='First Name'
									onChange={this.handleInput}
									required
									maxLength='20'
								/>
							</div>
							<div className='form-group'>
								<input
									className='form-control'
									type='text'
									name='lastName'
									placeholder='Last Name'
									onChange={this.handleInput}
									required
									maxLength='20'
								/>
							</div>
							<div className='form-group'>
								<input
									className='form-control'
									type='email'
									name='email'
									placeholder='Email'
									onChange={this.handleInput}
									defaultValue={
										this.props.location.state && this.props.location.state
									}
									required
									maxLength='50'
								/>
							</div>
							<div className='form-group'>
								<input
									className='form-control'
									type='password'
									name='password'
									placeholder='Password'
									onChange={this.handleInput}
									required
									maxLength='50'
								/>
							</div>
							<div className='form-group'>
								<input
									className='form-control'
									type='password'
									name='matchingPassword'
									placeholder='Password (repeat)'
									onChange={this.handleInput}
									required
									maxLength='50'
								/>
							</div>
							<div className='form-group'>
								<select
									className='form-control'
									id='sel1'
									value={this.state.role}
									name='role'
									onChange={this.handleInput}>
									<option>student</option>
									<option>instructor</option>
								</select>
							</div>

							<div className='form-group'>
								<div className='form-check'>
									<label className='form-check-label'>
										<input
											className='form-check-input'
											type='checkbox'
											required
										/>
										I agree to the <Link to='/TermsOfUse'>license terms.</Link>
									</label>
								</div>
							</div>
							<div className='form-group'>
								<button type='submit' className='btn btn-primary btn-block'>
									Sign Up
								</button>
							</div>
							<div className='already'>
								You already have an account?{" "}
								<Link to='/signIn'>Login here.</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(SignUp);
