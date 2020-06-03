import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
	ai,
	dataScience,
	creative,
	entrepreneurship,
	Finance,
	Human,
	Leadership,
	Media,
	Personal,
	programming,
	PROJECT,
	robotics,
	technology,
	Young,
} from "../assets";
import ThemeContext from "../ThemeContext";

export class ThemeCard extends Component {
	static contextType = ThemeContext;
	state = {
		isEnrolled: "",
		isStudent:
			localStorage.getItem("token") !== null &&
			jwt_decode(localStorage.token).roles[0] === "STUDENT",
	};

	handleEnroll = () => {
		this.context.handleEnrollTheme(this.props.theme.value);
		this.setState({ isEnrolled: "ACCEPTED" });
	};

	handleUnEnroll = () => {
		this.context.handleUnEnroll(this.props.theme.value);
		this.setState({ isEnrolled: "" });
	};

	checkEnrollment = () => {
		axios({
			url: `https://app.visioconf.site/api/v1/users/themes/enrollments?theme=${this.props.theme.value}`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					isEnrolled: res.data.payload[0].status,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	componentDidMount() {
		this.state.isStudent && this.checkEnrollment();
	}
	img = () => {
		switch (this.props.theme.value) {
			case "ai":
				return ai;
			case "programming":
				return programming;
			case "technology-training":
				return technology;
			case "robotics":
				return robotics;
			case "data-science":
				return dataScience;
			case "entrepreneurship":
				return entrepreneurship;
			case "young-leaders-development":
				return Young;
			case "human-resources-management":
				return Human;
			case "leadership-and-management":
				return Leadership;
			case "media-and-public-relations":
				return Media;
			case "finance-and-accounting":
				return Finance;
			case "personal-development":
				return Personal;
			case "project-management":
				return PROJECT;
			case "creative-thinking-and-innovation":
				return creative;
			default:
				return ai;
		}
	};
	render() {
		return (
			<div className='col-auto'>
				<div>
					<figure className='snip1527'>
						<div
							className='image'
							style={{
								backgroundImage: `url(${this.img()})`,
								backgroundSize: "cover",
								backgroundPosition: "center center",
								backgroundRepeat: "no-repeat",
								minHeight: "400px",
								width: "400px",
							}}></div>
						<figcaption>
							<h3>{this.props.theme.label}</h3>
							{this.state.isStudent && this.state.isEnrolled === "OPEN" && (
								<h6>Please wait for admin approval</h6>
							)}

							{this.state.isStudent && (
								<div className='mt-2'>
									{this.state.isEnrolled === "OPEN" ||
									this.state.isEnrolled === "ACCEPTED" ? (
										<button
											type='button'
											className='btn btn-danger mr-2'
											onClick={this.handleUnEnroll}>
											Unsubscribe
										</button>
									) : (
										<button
											type='button'
											className='btn btn-primary mr-2'
											onClick={this.handleEnroll}>
											Subscribe
										</button>
									)}
								</div>
							)}
						</figcaption>
					</figure>
				</div>
				<Link to={`/themeCourses/${this.props.theme.value}`}>
					<i className='fa fa-chevron-circle-right ' aria-hidden='true'></i>
				</Link>
			</div>
		);
	}
}

export default ThemeCard;
