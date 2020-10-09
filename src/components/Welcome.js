import React from "react";

const Welcome = () => {
	return (
		<div className='jumbotron center'>
			<h1 className='display-4'>Welcome!</h1>
			<p className='lead'>
				We have recieved your request, in the next 24H we will send you an
				e-mail of confirmation.
			</p>
			<hr className='my-4' />
			<p>Go back Home</p>
			<a className='btn btn-primary btn-lg' href='/' role='button'>
				Home
			</a>
		</div>
	);
};

export default Welcome;
