import React from "react";

const RequestRefund = () => {
	return (
		<div className='calibre' id='calibre_link-0'>
			<a className='btn btn-primary btn-lg mt-5' href='/' role='button'>
				Home
			</a>
			<p className='block_'>&nbsp;</p>
			<h1 className='block_1'>VISIOCONF: Request Your Refund</h1>
			<p className='block_2'>&nbsp;</p>
			<p className='block_3'>
				<span className='text_'>
					At VISIOCONF, our primary objective is to make our customers
					successful. However, if we were not able to meet your expectations,
					you can request for the refund by submitting the details on this page.
				</span>
				<span className='text_1'>
					<br className='calibre1' />
				</span>
				<span className='text_'>
					Before applying for refund, we request you to read and thoroughly
					understand our cancellation and refund policy here:
				</span>
				<span className='text_2'>&nbsp;</span>
				<a
					href='https://api.gvclearning.site/refund-policy'
					className='calibre2'>
					<span className='text_3'>https://api.gvclearning.site/</span>
					<span className='text_4'>refund-policy</span>
				</a>
				<span className='text_5'> </span>
			</p>
			<p className='block_3'>&nbsp;</p>
			<p className='block_4'>Email address:</p>
			<p className='block_4'>Name:</p>
			<p className='block_4'>Phone Number:</p>
			<p className='block_5'>Reason for Refund Request? </p>
			<ul className='list_'>
				<li className='block_6'>Feature not available</li>
				<li className='block_7'>
					Software is not working with recommended system requirement
				</li>
				<li className='block_7'>Switched over to another platform</li>
				<li className='block_7'>Overcharged for the platform</li>
				<li className='block_7'>Adequate training was not provided</li>
				<li className='block_7'>Support was mostly unresponsive</li>
				<li className='block_7'>
					Platform doesn’t fulfill my needs as promised during purchase
				</li>
				<li className='block_7'>Other:</li>
			</ul>
			<p className='block_3'>&nbsp;</p>
			<p className='block_5'>Describe your issue in detail *</p>
			<p className='block_8'>(at least 500 characters)</p>
			<p className='block_9'>&nbsp;</p>
			<p className='block_5'>What will make you change your mind? *</p>
			<p className='block_8'>
				*If you want to continue with VISIOCONF and get the issue escalated to
				the highest level please suggest here. We will ensure your request gets
				heard by the CEO at VISIOCONF.
			</p>
			<p className='block_3'>&nbsp;</p>
		</div>
	);
};

export default RequestRefund;
