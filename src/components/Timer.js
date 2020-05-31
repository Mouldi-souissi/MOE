import React, { Component } from "react";

export class Timer extends Component {
	constructor() {
		super();
		this.state = {
			hr: 0,
			min: 0,
			sec: 0,
			ms: this.props.time,
		};
		setInterval(() => {
			this.setState({
				ms: this.state.ms + 1000,
			});
			this.converter();
		}, 1000);
	}

	converter = () => {
		this.setState({
			hr: parseInt(this.state.ms / 3600000),
			min: parseInt((this.state.ms % 3600000) / 60000),
			sec: parseInt(((this.state.ms % 3600000) % 60000) / 1000),
		});
	};

	render() {
		return (
			<div className='timer'>
				<p>
					{String(this.state.hr).padStart(2, "0")}:
					{String(this.state.min).padStart(2, "0")}:
					{String(this.state.sec).padStart(2, "0")}
				</p>
				<p>hh/mm/ss</p>
			</div>
		);
	}
}

export default Timer;
