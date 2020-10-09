import React, { Component } from "react";
import axios from "axios";

export const CourseContext = React.createContext();

class CourseProvider extends Component {
	state = {
		course: [],
		err: "",
		request: "",
		loadedPic: 0,
		loadedFile: 0,
		loadedvideo: 0,
		bonusFiles: [],
		sessions: [],
		exams: [],
		recordings: [],
		status: "",
	};

	getCourse = (id) => {
		axios({
			url: "https://api.gvclearning.site/api/v1/courses",
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					course: res.data.payload.filter((el) => el.id === Number(id))[0],
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleEdit = (id, editedData, theme) => {
		editedData = { ...editedData, theme };

		axios({
			url: `https://api.gvclearning.site/api/v1/courses/${id}`,
			method: "put",
			headers: { authorization: localStorage.getItem("token") },
			data: editedData,
		})
			.then(() => {
				this.setState({});
				this.getCourse(id);
			})
			.catch((err) => console.log(err));
	};

	handlePictureUpload = (image, id) => {
		if (!image) {
			this.setState({
				...this.state,
				err: "Please select an image file",
				request: "fail",
			});
			setTimeout(() => {
				this.setState({
					...this.state,
					err: "",
					request: "",
				});
			}, 3000);
		}

		var formData = new FormData();
		formData.append("file", image);
		image &&
			axios({
				url: `https://api.gvclearning.site/api/v1/courses/${id}/picture`,
				method: "POST",
				headers: { authorization: localStorage.getItem("token") },
				data: formData,
				onUploadProgress: (ProgressEvent) => {
					this.setState({
						loadedPic: (ProgressEvent.loaded / ProgressEvent.total) * 100,
					});
					if (this.state.loadedPic === 100) {
						this.setState({
							...this.state,
							err: "Image Uploaded",
							request: "success",
						});
						setTimeout(() => {
							this.setState({
								...this.state,
								err: "",
								request: "",
							});
						}, 3000);
					}
				},
			})
				.then(() => {
					this.getCourse(id);
				})
				.catch((err) => console.log(err));
	};

	handleTextFileSend = (textFile, title, type, id) => {
		if (!type) {
			type = "PRESENTATION";
		}
		if (!textFile) {
			this.setState({
				...this.state,
				err: "Please select a text file",
				request: "fail",
			});
			setTimeout(() => {
				this.setState({
					...this.state,
					err: "",
					request: "",
				});
			}, 3000);
		}

		if (!title) {
			this.setState({
				...this.state,
				err: "Please fill title field",
				request: "fail",
			});
			setTimeout(() => {
				this.setState({
					...this.state,
					err: "",
					request: "",
				});
			}, 3000);
		}

		var formData = new FormData();
		formData.append("file", textFile);
		textFile &&
			title &&
			axios({
				url: `https://api.gvclearning.site/api/v1/courses/${id}/attachments?description=${title}&title=${title}&type=${type}`,
				method: "POST",
				headers: { authorization: localStorage.getItem("token") },
				data: formData,
				onUploadProgress: (ProgressEvent) => {
					this.setState({
						loadedFile: (ProgressEvent.loaded / ProgressEvent.total) * 100,
					});
					if (this.state.loadedFile === 100) {
						this.setState({
							...this.state,
							err: "File Uploaded",
							request: "success",
						});
						setTimeout(() => {
							this.setState({
								...this.state,
								err: "",
								request: "",
							});
						}, 3000);
					}
				},
			})
				.then(() => {
					this.getUploadedTextFiles(id);
				})
				.catch((err) => console.log(err));
	};

	handleVideoSend = (video, videoTitle, id) => {
		if (!video) {
			this.setState({
				...this.state,
				err: "Please select a video",
				request: "fail",
			});
			setTimeout(() => {
				this.setState({
					...this.state,
					err: "",
					request: "",
				});
			}, 3000);
		}

		if (!videoTitle) {
			this.setState({
				...this.state,
				err: "Please fill video title field",
				request: "fail",
			});
			setTimeout(() => {
				this.setState({
					...this.state,
					err: "",
					request: "",
				});
			}, 3000);
		}

		var formData = new FormData();
		formData.append("file", video);
		video &&
			videoTitle &&
			axios({
				url: `https://api.gvclearning.site/api/v1/courses/${id}/attachments?description=${videoTitle}&title=${videoTitle}&type=VIDEO_YT`,
				method: "POST",
				headers: { authorization: localStorage.getItem("token") },
				data: formData,
				onUploadProgress: (ProgressEvent) => {
					this.setState({
						loadedvideo: (ProgressEvent.loaded / ProgressEvent.total) * 100,
					});
					if (this.state.loadedvideo === 100) {
						this.setState({
							...this.state,
							err: "Video Uploaded",
							request: "success",
						});
						setTimeout(() => {
							this.setState({
								...this.state,
								err: "",
								request: "",
							});
						}, 3000);
					}
				},
			})
				.then(() => {
					this.getUploadedTextFiles(id);
				})
				.catch((err) => console.log(err));
	};

	getUploadedTextFiles = (id) => {
		axios({
			url: `https://api.gvclearning.site/api/v1/courses/${id}/attachments`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({ bonusFiles: res.data.payload });
			})
			.catch((err) => console.log(err));
	};

	handleDeleteFiles = (id, idCourse) => {
		axios({
			url: `https://api.gvclearning.site/api/v1/attachments/${id}`,
			method: "delete",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then(() => {
				this.getUploadedTextFiles(idCourse);
			})
			.catch((err) => console.log(err));
	};

	startSession = (autoStartRecording, idCourse) => {
		axios({
			url: `https://api.gvclearning.site/api/v1/courses/${idCourse}/meetings/create?autoStartRecording=${
				autoStartRecording === "No" ? false : true
			}`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		
		})
			.then((res) => {
				window.open(`${res.data.payload}`, "_blank");
			})
			.catch((err) => console.log(err));
		this.getSessions(Number(idCourse));
	};

	getSessions = (id) => {
		axios({
			url: `https://api.gvclearning.site/api/v1/courses/${id}/meetings?running=true`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => this.setState({ sessions: res.data.payload }))
			.catch((err) => console.log(err));
	};

	getExamsByCourse = (id) => {
		axios({
			url: `https://api.gvclearning.site/api/v1/courses/${id}/exams`,
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					exams: res.data.payload,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getRecordedSessions = (id) => {
		axios({
			url: `https://api.gvclearning.site/api/v1/courses/${id}/meetings/recordings`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) =>
				this.setState({
					recordings: res.data.payload,
				})
			)
			.catch((err) => console.log(err));
	};

	checkCompleted = (id) => {
		axios({
			url: `https://api.gvclearning.site/api/v1/courses/enrollments`,
			method: "get",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					status: res.data.payload.filter((el) => el.courseId === Number(id))[0]
						.status,
				});
			})
			.catch((err) => console.log(err));
	};

	handleCompleted = (id, studentId) => {
		axios({
			url: `https://api.gvclearning.site/api/v1/courses/${id}/enrollments?studentId=${studentId}`,
			method: "put",
			headers: { authorization: localStorage.getItem("token") },
			data: {
				status: "COMPLETED",
			},
		})
			.then(() => {
				this.setState({});
				this.checkCompleted(id);
			})
			.catch((err) => console.log(err));
	};

	render() {
		const { children } = this.props;
		const {
			course,
			loadedPic,
			request,
			err,
			loadedFile,
			loadedvideo,
			bonusFiles,
			sessions,
			exams,
			recordings,
			status,
		} = this.state;
		const {
			getCourse,
			handleEdit,
			handlePictureUpload,
			handleTextFileSend,
			handleVideoSend,
			getUploadedTextFiles,
			handleDeleteFiles,
			startSession,
			getSessions,
			getExamsByCourse,
			getRecordedSessions,
			checkCompleted,
			handleCompleted,
		} = this;

		return (
			<CourseContext.Provider
				value={{
					course,
					loadedPic,
					request,
					err,
					loadedFile,
					loadedvideo,
					bonusFiles,
					sessions,
					exams,
					recordings,
					status,
					getCourse,
					handleEdit,
					handlePictureUpload,
					handleTextFileSend,
					handleVideoSend,
					getUploadedTextFiles,
					handleDeleteFiles,
					startSession,
					getSessions,
					getExamsByCourse,
					getRecordedSessions,
					checkCompleted,
					handleCompleted,
				}}>
				{children}
			</CourseContext.Provider>
		);
	}
}

export default CourseContext;

export { CourseProvider };
