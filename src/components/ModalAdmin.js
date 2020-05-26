import React, { Component } from "react";
import UserContext from "../UserContext";

export class ModalAdmin extends Component {
	static contextType = UserContext;
	state = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		matchingPassword: "",
		role: "student",
	};

	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleAdd = (e) => {
		e.preventDefault();
		let user = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			password: this.state.password,
			matchingPassword: this.state.matchingPassword,
		};
		this.context.handleAdd(user, this.state.role);
	};

	render() {
		return (
			<div>
				<button
					type='button'
					className='btn btn-primary'
					data-toggle='modal'
					data-target='#exampleModal'>
					Add User
				</button>

				<div
					className='modal fade'
					id='exampleModal'
					tabIndex='-1'
					role='dialog'
					aria-labelledby='exampleModalLabel'
					aria-hidden='true'
					data-backdrop='static'>
					<div className='modal-dialog' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title' id='exampleModalLabel'>
									Add User
								</h5>
								<button
									type='button'
									className='close'
									data-dismiss='modal'
									aria-label='Close'>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div>
							<div className='modal-body'>
								<form onSubmit={this.handleAdd}>
									<div className='form-group'>
										<input
											className='form-control'
											type='text'
											name='firstName'
											placeholder='First Name'
											onChange={this.handleInput}
											required
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
										/>
									</div>
									<div className='form-group'>
										<input
											className='form-control'
											type='email'
											name='email'
											placeholder='Email'
											onChange={this.handleInput}
											required
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
									<button
										type='button'
										className='btn btn-secondary mr-3'
										data-dismiss='modal'>
										Close
									</button>
									<button type='submit' className='btn btn-primary'>
										Save changes
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ModalAdmin;
