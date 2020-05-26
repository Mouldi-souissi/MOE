import React, { Component } from "react";

export class AltSidebar extends Component {
	render() {
		return (
			<div>
				<div class='sidebar'>
					<a class='active' href='#home'>
						Home
					</a>
					<a href='#news'>News</a>
					<a href='#contact'>Contact</a>
					<a href='#about'>About</a>
				</div>

				<div class='content'>..</div>
			</div>
		);
	}
}

export default AltSidebar;
