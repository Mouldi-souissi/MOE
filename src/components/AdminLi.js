import React, { Component } from "react";
import UserContext from "../UserContext";
import ResetModal from "./ResetModal";
// import { v4 as uuidv4 } from "uuid";

export class AdminLi extends Component {
	static contextType = UserContext;
	state = {
		isEditing: false,
		editedData: [],
	};

	handleEdit = () => {
		this.setState({ isEditing: true });
		if (this.state.editedData.length !== 0) {
			this.context.handleEdit(this.state.editedData, this.props.user.id);
			this.setState({ isEditing: false });
		}
	};

	render() {
		let { user } = this.props;
		let filtered = [];
		this.props.role === "student"
			? (filtered = this.context.students.filter(
					(student) => student.id === this.props.user.id
			  ))
			: (filtered = this.context.instructors.filter(
					(instructor) => instructor.id === this.props.user.id
			  ));
		let isValid = filtered[0] && filtered[0].active && filtered[0].valid;

		return (
			<tbody>
				<tr align='center'>
					<td>
						<div className='avatar-nav'>
							{user.picture && (
								<img
									alt='img'
									src={`https://app.visioconf.site/img/${user.picture}`}
								/>
							)}
						</div>
					</td>

					<td className='align-middle'>
						<div> {user.createdDate}</div>
					</td>
					<td className='align-middle'>
						{this.state.isEditing ? (
							<input
								defaultValue={user.firstName}
								name='firstName'
								onChange={(e) =>
									this.setState({
										...this.state,
										editedData: {
											...this.state.editedData,
											firstName: e.target.value,
										},
									})
								}
							/>
						) : (
							<div> {user.firstName}</div>
						)}
					</td>
					<td className='align-middle'>
						{this.state.isEditing ? (
							<input
								defaultValue={user.lastName}
								name='lastName'
								onChange={(e) =>
									this.setState({
										...this.state,
										editedData: {
											...this.state.editedData,
											lastName: e.target.value,
										},
									})
								}
							/>
						) : (
							<div> {user.lastName}</div>
						)}
					</td>
					<td className='align-middle'>
						<div> {user.email}</div>
					</td>

					{!isValid ? (
						<td className='align-middle'>
							<button
								className='btn btn-primary activate'
								type='button'
								onClick={() => this.context.handleValidate(this.props.user.id)}>
								Activate
							</button>
						</td>
					) : this.state.isEditing ? (
						<td className='align-middle'>
							<select
								className='form-control'
								id='sel1'
								name='active'
								onChange={(e) =>
									this.setState({
										...this.state,
										editedData: {
											...this.state.editedData,
											active: e.target.value === "active" ? true : false,
											valid: e.target.value === "active" ? true : false,
										},
									})
								}>
								<option>active</option>
								<option>Not active</option>
							</select>
						</td>
					) : (
						<td className='align-middle'>
							<div> {user.active ? "active" : "Not active"}</div>
						</td>
					)}
					<td className='align-middle' align='center'>
						<button
							className='btn btn-danger'
							aria-hidden='true'
							data-toggle='modal'
							data-target='#reset'>
							Reset
						</button>
						<ResetModal id={user.id} />
					</td>
					<td align='center' className='align-middle'>
						<button className='btn btn-primary mb-2' onClick={this.handleEdit}>
							<em className='fa fa-pencil'></em>
							{this.state.isEditing ? "Save" : ""}
						</button>

						{this.state.isEditing && (
							<button
								className='btn btn-danger'
								onClick={() => this.setState({ isEditing: false })}>
								<i className='fa fa-times' aria-hidden='true'></i>
							</button>
						)}
					</td>
				</tr>
			</tbody>
		);
	}
}

export default AdminLi;
