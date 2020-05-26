import React, { Component } from "react";
import scriptbbb from "../scripts/scriptbbb";
import Axios from "axios";
import { withRouter } from "react-router-dom";

export class BigBlue extends Component {
	state = {
		confId: "",
		confName: "",
		moderatorPass: "",
		attendeePass: "",
	};

	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleBigBlue = () => {
		let { confId, confName, moderatorPass, attendeePass } = this.state;
		let secret = "f84cf90c50164ddaf023767c19f29f61";
		let s = scriptbbb(confId, confName, moderatorPass, attendeePass, secret);
		console.log(s);
		Axios.get(`http://visioconf.site/bigbluebutton/api/create?${s}`)
			.then((res) => {
				// this.props.history.push("/bigBlue/join");
				this.props.changeTab();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<div className='bbbContainer'>
				<div className='bbb mx-auto'>
					<form action='#'>
						<h2 className='sr-only'>Login Form</h2>

						<div className='illustration'>
							<i className='icon ion-ios-navigate'></i>
						</div>
						<div className='form-group'>
							<input
								className='form-control'
								type='text'
								name='confId'
								placeholder='confID'
								onChange={this.handleInput}
								required
							/>
						</div>
						<div className='form-group'>
							<input
								className='form-control'
								type='text'
								name='confName'
								placeholder='confName'
								onChange={this.handleInput}
								required
							/>
						</div>
						<div className='form-group'>
							<input
								className='form-control'
								type='text'
								name='moderatorPass'
								placeholder='moderatorPass'
								onChange={this.handleInput}
								required
							/>
						</div>
						<div className='form-group'>
							<input
								className='form-control'
								type='text'
								name='attendeePass'
								placeholder='attendeePass'
								onChange={this.handleInput}
								required
							/>
						</div>

						<div className='form-group'>
							<button
								type='button'
								className='btn btn-primary btn-block'
								onClick={this.handleBigBlue}>
								Create
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(BigBlue);
