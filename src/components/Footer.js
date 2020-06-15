import React from "react";

const Footer = () => {
	return (
		<footer className='footer bg-light pt-4 pb-4'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-6 my-auto h-100 text-center text-lg-left'>
						<ul className='list-inline mb-2'>
							<li className='list-inline-item'>
								<a href='/CancellationPolicy'>Cancellation and Refund Policy</a>
							</li>
							<li className='list-inline-item'>
								<span>⋅</span>
							</li>
							<li className='list-inline-item'>
								<a href='/License'>License Agreement</a>
							</li>
							<li className='list-inline-item'>
								<span>⋅</span>
							</li>
							<li className='list-inline-item'>
								<a href='/TermsOfUse'>Terms of Use</a>
							</li>
							<li className='list-inline-item'>
								<span>⋅</span>
							</li>
							<li className='list-inline-item'>
								<a href='/PrivacyPolicy'>Privacy Policy</a>
							</li>
							<li className='list-inline-item'>
								<span>⋅</span>
							</li>
							<li className='list-inline-item'>
								<a href='https://docs.google.com/forms/d/1broNJzPzemTNhmUIJc_I-4HD7YuYDPQjSSdp16SWisY/viewform?edit_requested=true'>
									Request Your Refund
								</a>
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
	);
};

export default Footer;
