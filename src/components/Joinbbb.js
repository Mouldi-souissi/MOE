import React, { Component } from "react";
import scriptbbb2 from "../scripts/scriptbbb2";
import Axios from "axios";

export class BigBlue extends Component {
	state = {
		meetingID: "",
		password: "",
		fullName: "",
		url: "",
	};

	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleBigBlue = () => {
		let secret = "f84cf90c50164ddaf023767c19f29f61";
		let { meetingID, password, fullName } = this.state;

		let s = scriptbbb2(fullName, meetingID, password, secret);
		console.log(s);

		Axios.get(`https://visioconf.site/bigbluebutton/api/join?${s}`).then(
			(res) => {
				var parseString = require("xml2js").parseString;
				var xml = res.data;
				parseString(xml, (err, result) => {
					console.dir(result);
					this.setState({ url: result.response.url[0] });
					console.log(this.state.url);
				});
			}
		);
		window.open(`https://visioconf.site/bigbluebutton/api/join?${s}`, "_blank");
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
								name='meetingID'
								placeholder='meetingID'
								onChange={this.handleInput}
								required
							/>
						</div>
						<div className='form-group'>
							<input
								className='form-control'
								type='text'
								name='password'
								placeholder='password'
								onChange={this.handleInput}
								required
							/>
						</div>
						<div className='form-group'>
							<input
								className='form-control'
								type='text'
								name='fullName'
								placeholder='fullName'
								onChange={this.handleInput}
								required
							/>
						</div>
						<div className='form-group'>
							<button
								type='button'
								className='btn btn-primary btn-block'
								onClick={this.handleBigBlue}>
								Join
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default BigBlue;
