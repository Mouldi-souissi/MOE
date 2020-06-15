import React, { Component } from "react";

export class Notifications extends Component {
	render() {
		return (
			<div>
				<div className='scores mr-5 ml-5'>
					<h4 className='center mb-3'>New Courses:</h4>
					<table className='table table-striped'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Title</th>
								<th scope='col'>Instructor</th>
								<th scope='col'>Theme</th>
								<th scope='col'>Date</th>
							</tr>
						</thead>
						{this.props.newCourses.map((course, i) => (
							<tbody key={i}>
								<tr>
									<th scope='row'>{i + 1}</th>
									<td>{course.title}</td>
									<td>{course.createdBy.lastName}</td>
									<td>{course.theme.value}</td>
									<td>{course.createdDate}</td>
								</tr>
							</tbody>
						))}
					</table>
				</div>
				<div className='scores mr-5 ml-5'>
					<h4 className='center mb-3'>New Attachments:</h4>
					<table className='table table-striped'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Course Title</th>
								<th scope='col'>File Title</th>
								<th scope='col'>Type</th>
								<th scope='col'>Date</th>
							</tr>
						</thead>
						{this.props.bonusFiles.map((file, i) => (
							<tbody key={i}>
								<tr>
									<th scope='row'>{i + 1}</th>
									<td>{file.titleCourse}</td>
									<td>{file.title}</td>
									<td>{file.type}</td>
									<td>{file.createdDate}</td>
								</tr>
							</tbody>
						))}
					</table>
				</div>
			</div>
		);
	}
}

export default Notifications;
