import React, { Component } from "react";
import ThemeCard from "./ThemeCard";
import ThemeContext from "../ThemeContext";

export class MyThemes extends Component {
	static contextType = ThemeContext;

	componentDidMount() {
		this.context.getEnrolledThemes();
	}

	render() {
		const enrolledThemes = this.context.enrolledThemes.filter(
			(theme) => theme.status !== "REFUSED"
		);
		return (
			<div className='container-fluid mt-5'>
				<h4 className='center mb-5'>Subscribed Themes</h4>
				<div className='row justify-content-center'>
					{enrolledThemes &&
						enrolledThemes.map((theme) => (
							<ThemeCard key={theme.label} theme={theme} />
						))}
				</div>
			</div>
		);
	}
}

export default MyThemes;
