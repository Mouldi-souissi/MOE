import React, { Component } from "react";
import testi1 from "../assets/testimonials-1.jpg";
import testi2 from "../assets/testimonials-2.jpg";
import testi3 from "../assets/testimonials-3.jpg";
import axios from "axios";
import ThemeCard from "./ThemeCard";

import { Link } from "react-router-dom";

export class Landing extends Component {
	state = {
		themes: [],
		email: "",
	};
	getAllThemes = () => {
		axios({
			url: "http://91.134.133.143:9090/api/v1/public/themes",
			method: "get",
		})
			.then((res) => this.setState({ themes: res.data.payload.slice(0, 3) }))
			.catch((err) => console.log(err));
	};
	componentDidMount() {
		this.getAllThemes();
	}
	render() {
		return (
			<div>
				<header className='masthead text-white text-center d-flex align-items-center thunder'>
					<div className='container'>
						<div className='row'>
							<div className='col-xl-9 mx-auto'>
								<h1 className='mb-5  hero-text'>
									Get access to all the knowledge you will ever need !
								</h1>
							</div>
							<div className='col-md-10 col-lg-8 col-xl-7 mx-auto'>
								<form>
									<div className='form-row'>
										<div className='col-12 col-md-9 mb-2 mb-md-0'>
											<input
												className='form-control form-control-lg'
												type='email'
												placeholder='Enter your email...'
												onChange={(e) =>
													this.setState({ email: e.target.value })
												}
											/>
										</div>
										<div className='col-12 col-md-3'>
											<Link
												to={{
													pathname: "/signUp",
													state: this.state.email,
												}}
												className='btn btn-primary btn-block btn-lg'
												type='submit'>
												Sign up!
											</Link>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</header>

				<section className='features-clean'>
					<div className='container'>
						<div className='intro'>
							<h2 className='text-center'>Features</h2>
							<p className='text-center'>
								Nunc luctus in metus eget fringilla. Aliquam sed justo ligula.
								Vestibulum nibh erat, pellentesque ut laoreet vitae.{" "}
							</p>
						</div>
						<div className='row features'>
							<div className='col-sm-6 col-lg-4 item'>
								<i className='fa fa-map-marker icon'></i>
								<h3 className='name'>Works everywhere</h3>
								<p className='description'>
									Aenean tortor est, vulputate quis leo in, vehicula rhoncus
									lacus. Praesent aliquam in tellus eu gravida. Aliquam varius
									finibus est.
								</p>
							</div>
							<div className='col-sm-6 col-lg-4 item'>
								<i className='fa fa-clock-o icon'></i>
								<h3 className='name'>Always available</h3>
								<p className='description'>
									Aenean tortor est, vulputate quis leo in, vehicula rhoncus
									lacus. Praesent aliquam in tellus eu gravida. Aliquam varius
									finibus est.
								</p>
							</div>
							<div className='col-sm-6 col-lg-4 item'>
								<i className='fa fa-list-alt icon'></i>
								<h3 className='name'>Customizable</h3>
								<p className='description'>
									Aenean tortor est, vulputate quis leo in, vehicula rhoncus
									lacus. Praesent aliquam in tellus eu gravida. Aliquam varius
									finibus est.
								</p>
							</div>
							<div className='col-sm-6 col-lg-4 item'>
								<i className='fa fa-leaf icon'></i>
								<h3 className='name'>Organic</h3>
								<p className='description'>
									Aenean tortor est, vulputate quis leo in, vehicula rhoncus
									lacus. Praesent aliquam in tellus eu gravida. Aliquam varius
									finibus est.
								</p>
							</div>
							<div className='col-sm-6 col-lg-4 item'>
								<i className='fa fa-plane icon'></i>
								<h3 className='name'>Fast</h3>
								<p className='description'>
									Aenean tortor est, vulputate quis leo in, vehicula rhoncus
									lacus. Praesent aliquam in tellus eu gravida. Aliquam varius
									finibus est.
								</p>
							</div>
							<div className='col-sm-6 col-lg-4 item'>
								<i className='fa fa-phone icon'></i>
								<h3 className='name'>Mobile-first</h3>
								<p className='description'>
									Aenean tortor est, vulputate quis leo in, vehicula rhoncus
									lacus. Praesent aliquam in tellus eu gravida. Aliquam varius
									finibus est.
								</p>
							</div>
						</div>
					</div>
				</section>
				<div className='bg-light'>
					<div className='container py-5'>
						<div className='row h-100 align-items-center py-5'>
							<div className='col-lg-6'>
								<h1 className='display-4 mb-3'>About us</h1>
								<h2 className='lead '>
									VIRTUAL CLASSROOM SOFTWARE Online Teaching & Training Software
								</h2>
								<p className='lead text-muted mb-0'>
									VISIOCONF is Virtual Classroom Software and a Learning
									Management System for Online Courses and Live Online Classes.
									Teach and train in a virtual classroom - anyone, anywhere.
								</p>
							</div>
							<div className='col-lg-6 d-none d-lg-block'>
								<img
									src='https://res.cloudinary.com/mhmd/image/upload/v1556834136/illus_kftyh4.png'
									alt=''
									className='img-fluid'
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='bg-white py-5'>
					<div className='container py-5'>
						<div className='row align-items-center mb-5'>
							<div className='col-lg-6 order-2 order-lg-1'>
								<h2 className='font-weight-light mb-5'>
									Learning Management System
								</h2>
								<p className='font-italic text-muted mb-4'>
									With VISIOCONF trainers and schools deliver educational
									courses or training programs to students. A rich set of LMS
									elements allow administration, documentation, tracking,
									evaluation and reporting. Instructors can administer tests and
									other assignments, track student progress, and manage
									record-keeping. With VISIOCONF schools can deliver all forms
									of learning – online, blended, synchronous and asynchronous.
								</p>
							</div>
							<div className='col-lg-5 px-5 mx-auto order-1 order-lg-2'>
								<img
									src='https://res.cloudinary.com/mhmd/image/upload/v1556834139/img-1_e25nvh.jpg'
									alt=''
									className='img-fluid mb-4 mb-lg-0'
								/>
							</div>
						</div>
						<div className='row align-items-center'>
							<div className='col-lg-5 px-5 mx-auto'>
								<img
									src='https://res.cloudinary.com/mhmd/image/upload/v1556834136/img-2_vdgqgn.jpg'
									alt=''
									className='img-fluid mb-4 mb-lg-0'
								/>
							</div>
							<div className='col-lg-6'>
								<h2 className='font-weight-light mb-5'>
									Virtual Classroom Software
								</h2>
								<p className='font-italic text-muted mb-4'>
									VISIOCONF Live virtual classroom software is an integral part
									of the Learning Management System. It is a state-of-the-art
									live online training classroom that with live video, crystal
									clear audio, multiple interactive whiteboards, markup and
									annotation tools, file and document sharing, screen sharing
									and many other collaboration tools. Teaching in an VISIOCONF
									Live virtual classroom provides ultimate experience for both
									trainer and trainees.
								</p>
							</div>
						</div>
						<div className='row align-items-center mb-5 mt-5'>
							<div className='col-lg-6 order-2 order-lg-1'>
								<h2 className='font-weight-light mb-5'>
									Cross-Platform Online Teaching Software
								</h2>
								<p className='font-italic text-muted mb-4'>
									Mobile Learning is just natural with VISIOCONF Virtual
									Classroom as we support all popular mobile devices. You can
									have students attending live classes and online courses using
									tablets and phones along with students and teachers using
									computers and laptops at the same time.
								</p>
							</div>
							<div className='col-lg-5 px-5 mx-auto order-1 order-lg-2'>
								<img
									src='https://res.cloudinary.com/mhmd/image/upload/v1556834139/img-1_e25nvh.jpg'
									alt=''
									className='img-fluid mb-4 mb-lg-0'
								/>
							</div>
						</div>
					</div>
				</div>

				<div className='article-list d-flex align-items-center'>
					<div className='container'>
						<div className='intro'>
							<h2 className='text-center'>Our Themes</h2>
							<p className='text-center mb-5'>
								Nunc luctus in metus eget fringilla. Aliquam sed justo ligula.
								Vestibulum nibh erat, pellentesque ut laoreet vitae.{" "}
							</p>
						</div>

						<div className='row mb-5'>
							{this.state.themes &&
								this.state.themes.map((theme) => (
									<ThemeCard key={theme.label} theme={theme} />
								))}
							{/* <div className='col-sm-6 col-md-4 item'>
								<a href='/'>
									<img className='img-fluid' src={article1} alt='img' />
								</a>
								<h3 className='name'>Article Title</h3>
								<p className='description'>
									Aenean tortor est, vulputate quis leo in, vehicula rhoncus
									lacus. Praesent aliquam in tellus eu gravida. Aliquam varius
									finibus est, interdum justo suscipit id.
								</p>
								<a className='action' href='/'>
									<i className='fa fa-arrow-circle-right'></i>
								</a>
							</div>
							<div className='col-sm-6 col-md-4 item'>
								<a href='/'>
									<img className='img-fluid' src={article2} alt='img' />
								</a>
								<h3 className='name'>Article Title</h3>
								<p className='description'>
									Aenean tortor est, vulputate quis leo in, vehicula rhoncus
									lacus. Praesent aliquam in tellus eu gravida. Aliquam varius
									finibus est, interdum justo suscipit id.
								</p>
								<a className='action' href='/'>
									<i className='fa fa-arrow-circle-right'></i>
								</a>
							</div>
							<div className='col-sm-6 col-md-4 item'>
								<a href='/'>
									<img className='img-fluid' src={article3} alt='img' />
								</a>
								<h3 className='name'>Article Title</h3>
								<p className='description'>
									Aenean tortor est, vulputate quis leo in, vehicula rhoncus
									lacus. Praesent aliquam in tellus eu gravida. Aliquam varius
									finibus est, interdum justo suscipit id.
								</p>
								<a className='action' href='/'>
									<i className='fa fa-arrow-circle-right'></i>
								</a>
							</div> */}
						</div>
					</div>
				</div>

				<section className='testimonials text-center bg-light'>
					<h2 className='text-center mb-5'>What people are saying...</h2>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-4'>
								<div className='mx-auto testimonial-item mb-5 mb-lg-0'>
									<img
										className='rounded-circle img-fluid mb-3'
										src={testi1}
										alt='img'
									/>
									<h5>Amira.</h5>
									<p className='font-weight-light mb-0'>
										"The content was extremely informative and incredibly
										useful. I have attended several trainings before, but I
										can’t recall any of them having such a strong impact. You
										have done an excellent job, and I appreciate your efforts. I
										will surely recommend this training to all my colleagues."
									</p>
								</div>
							</div>
							<div className='col-lg-4'>
								<div className='mx-auto testimonial-item mb-5 mb-lg-0'>
									<img
										className='rounded-circle img-fluid mb-3'
										src={testi2}
										alt='img'
									/>
									<h5>Ali Albloushi.</h5>
									<p className='font-weight-light mb-0'>
										"Overall, a great session with superb interaction from all
										participants. A real enjoyable and educational experience. A
										true delight to the training arena ! - "
									</p>
								</div>
							</div>
							<div className='col-lg-4'>
								<div className='mx-auto testimonial-item mb-5 mb-lg-0'>
									<img
										className='rounded-circle img-fluid mb-3'
										src={testi3}
										alt='img'
									/>
									<h5>Sarah W.</h5>
									<p className='font-weight-light mb-0'>
										"I would like to thank Global Vision for the well-organized
										training. The training was superb, and I genuinely enjoyed
										each and every moment of it. The content was extremely
										informative and incredibly useful. I have attended several
										trainings before, but I can’t recall any of them having such
										a strong impact. You have done an excellent job, and I
										appreciate your efforts. I will surely recommend this
										training to all my colleagues."
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className='call-to-action text-white text-center d-flex align-items-center'>
					<div className='overlay'></div>
					<div className='container'>
						<div className='row'>
							<div className='col-xl-9 mx-auto'>
								<h2 className='mb-4 hero-text'>
									Ready to get started? Sign up now!
								</h2>
							</div>
							<div className='col-md-10 col-lg-8 col-xl-7 mx-auto'>
								<form>
									<div className='form-row'>
										<div className='col-12 col-md-9 mb-2 mb-md-0'>
											<input
												className='form-control form-control-lg'
												type='email'
												placeholder='Enter your email...'
												onChange={(e) =>
													this.setState({ email: e.target.value })
												}
											/>
										</div>
										<div className='col-12 col-md-3'>
											<Link
												to={{
													pathname: "/signUp",
													state: this.state.email,
												}}
												className='btn btn-primary btn-block btn-lg'
												type='submit'>
												Sign up!
											</Link>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>

				<footer className='footer bg-light'>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-6 my-auto h-100 text-center text-lg-left'>
								<ul className='list-inline mb-2'>
									<li className='list-inline-item'>
										<a href='/'>About</a>
									</li>
									<li className='list-inline-item'>
										<span>⋅</span>
									</li>
									<li className='list-inline-item'>
										<a href='/'>Contact</a>
									</li>
									<li className='list-inline-item'>
										<span>⋅</span>
									</li>
									<li className='list-inline-item'>
										<a href='/'>Terms of &nbsp;Use</a>
									</li>
									<li className='list-inline-item'>
										<span>⋅</span>
									</li>
									<li className='list-inline-item'>
										<a href='/'>Privacy Policy</a>
									</li>
								</ul>
								<p className='text-muted small mb-4 mb-lg-0'>
									© Moe E-LEARNING 2020. All Rights Reserved.
								</p>
							</div>
							<div className='col-lg-6 my-auto h-100 text-center text-lg-right'>
								<ul className='list-inline mb-0'>
									<li className='list-inline-item'>
										<a href='/'>
											<i className='fa fa-facebook fa-2x fa-fw'></i>
										</a>
									</li>
									<li className='list-inline-item'>
										<a href='/'>
											<i className='fa fa-twitter fa-2x fa-fw'></i>
										</a>
									</li>
									<li className='list-inline-item'>
										<a href='/'>
											<i className='fa fa-instagram fa-2x fa-fw'></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</footer>
			</div>
		);
	}
}

export default Landing;
