import React, { Component } from "react";

export class ContactUs extends Component {
	render() {
		return (
			<div>
				<div className='contact-clean container'>
					<div className='row'>
						<div className='col-4'>
							<div className='center'>
								Everyone in Global Vision is ready to help you. That is one of
								our commitments. If you wish to inquire about any of our
								products or services, or if you wish to have additional
								information about a specific product or service, please complete
								the sections below with a short description of your requirement
								and we will promptly respond to your inquiry. Expected
								turnaround time for standard inquiries is one business day.
							</div>
							<div className='mt-5 center'>
								<div>
									<h6>ADDRESS:</h6> Office 4 & 5, Mezzanine Floor, Al Ahliya
									Tower, Block A, Khalidiya, Abu Dhabi, UAE P.O. BOX 63276
								</div>
								<div>
									<h6 className='mt-2'>Phone:</h6>
									GVC Office : +97126582627
								</div>
							</div>
						</div>

						<form method='post' className='col-4'>
							<h2 className='text-center'>Contact us</h2>
							<div className='form-group'>
								<input
									className='form-control'
									type='text'
									name='name'
									placeholder='Name'
								/>
							</div>
							<div className='form-group'>
								<input
									className='form-control is-invalid'
									type='email'
									name='email'
									placeholder='Email'
								/>
								{/* <small className='form-text text-danger'>
								Please enter a correct email address.
							</small> */}
							</div>
							<div className='form-group'>
								<textarea
									className='form-control'
									name='message'
									placeholder='Message'
									rows='14'></textarea>
							</div>
							<div className='form-group'>
								<button className='btn btn-primary' type='submit'>
									send{" "}
								</button>
							</div>
						</form>
						<div className='col-4'>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7263.113412036458!2d54.33373107509156!3d24.466160686965505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e65e0cfa0c92f%3A0x71a23fda2e5a3db!2sGlobal%20Vision%20Consultancy%20Abu%20Dhabi%20(GVC%20Abu%20Dhabi)!5e0!3m2!1sen!2sae!4v1591758282413!5m2!1sen!2sae'
								width='400'
								height='400'
								frameBorder='0'
								style={{ border: "0" }}
								allowFullScreen=''
								aria-hidden='false'
								tabIndex='0'
								title='maps'></iframe>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ContactUs;
