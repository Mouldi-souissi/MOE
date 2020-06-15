import React, { Component } from "react";
import axios from "axios";

export const ExamContext = React.createContext();

class ExamProvider extends Component {
	state = { exam: [], durationMin: 0, isDone: false, score: 0 };

	startExam = (id) => {
		axios({
			url: `https://app.visioconf.site/api/v1/exams/${id}/start-assessment`,
			method: "put",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					exam: res.data.payload.exam,
					durationMin: res.data.payload.exam.durationMin,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getExamById = (id) => {
		axios({
			url: `https://app.visioconf.site/api/v1/exams/${id}`,
			method: "GET",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				this.setState({
					exam: res.data.payload,
					durationMin: res.data.payload.durationMin,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleEditExam = (editedData, id) => {
		if (editedData) {
			axios({
				url: `https://app.visioconf.site/api/v1/exams/${id}`,
				method: "put",
				headers: { authorization: localStorage.getItem("token") },
				data: editedData,
			})
				.then(() => {
					this.setState({});
					this.getExamById(id);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	handleAddQ = (id, addedQuestion) => {
		axios({
			url: `https://app.visioconf.site/api/v1/exams/${id}/questions`,
			method: "post",
			headers: { authorization: localStorage.getItem("token") },
			data: [
				{
					answers: [
						{
							correct: false,
							text: "First answer",
						},
					],
					statement: addedQuestion,
				},
			],
		})
			.then(() => {
				this.setState({});
				this.getExamById(id);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	calculateAndSendScore = (grabedAnswers, id) => {
		let answers = grabedAnswers;
		for (let i = 0; i < answers.length; i++) {
			for (let j = 0; j < answers.length; j++) {
				if (i !== j) {
					if (answers[i].id === answers[j].id) {
						if (answers[i].date > answers[j].date) {
							answers[j] = {};
						} else answers[i] = {};
					}
				}
			}
		}
		// filter checked answers
		let filtered = answers.filter((el) => el.checked);
		// calculating scrore
		let result =
			(filtered.filter((el) => el.correct).length -
				filtered.filter((el) => !el.correct).length) /
			this.state.exam.questions.map((el) => el.answers.find((el) => el.correct))
				.length;
		result = result * 100;

		// sending score

		axios({
			url: `https://app.visioconf.site/api/v1/exams/${id}/submit-assessment`,
			method: "put",
			headers: { authorization: localStorage.getItem("token") },
			data: {
				score: result < 0 ? 0 : result,
				status: result < 50 ? "FAILED" : "SUCCEEDED",
			},
		})
			.then(() => {
				this.setState({ isDone: true, score: result < 0 ? 0 : result });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleEditQuestion = (id, question, idExam) => {
		axios({
			url: `https://app.visioconf.site/api/v1/questions/${id}`,
			method: "put",
			headers: { authorization: localStorage.getItem("token") },
			data: { statement: question },
		})
			.then(() => {
				this.setState({});
				this.getExamById(idExam);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleAddA = (id, answer, answerType, idExam) => {
		axios({
			url: `https://app.visioconf.site/api/v1/questions/${id}/answers`,
			method: "post",
			headers: { authorization: localStorage.getItem("token") },
			data: [{ text: answer, correct: answerType }],
		})
			.then(() => {
				this.setState({});
				this.getExamById(idExam);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleDeleteQuestion = (id, idExam) => {
		axios({
			url: `https://app.visioconf.site/api/v1/questions/${id}`,
			method: "delete",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then(() => {
				this.setState({});
				this.getExamById(idExam);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleEditAnswer = (id, editedAnswer, editedType, idExam) => {
		axios({
			url: `https://app.visioconf.site/api/v1/answers/${id}`,
			method: "put",
			headers: { authorization: localStorage.getItem("token") },
			data: { text: editedAnswer, correct: editedType },
		})
			.then(() => {
				this.setState({});
				this.getExamById(idExam);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleDeleteAnswer = (id, idExam) => {
		axios({
			url: `https://app.visioconf.site/api/v1/answers/${id}`,
			method: "delete",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then(() => {
				this.setState({});
				this.getExamById(idExam);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// add exam
	reset = () => {
		this.setState({ exam: [] });
	};

	handleAddExam = (id, data) => {
		axios({
			url: `https://app.visioconf.site/api/v1/courses/${id}/exams`,
			method: "post",
			headers: { authorization: localStorage.getItem("token") },
			data: data,
		})
			.then((res) => {
				window.location.href = `/exam${res.data.payload.id}`;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	deleteExam = (id, courseId) => {
		axios({
			url: `https://app.visioconf.site/api/v1/exams/${id}`,
			method: "delete",
			headers: { authorization: localStorage.getItem("token") },
		})
			.then((res) => {
				// window.location.href = `/article${courseId}`;
				// window.location.href = `/dashboardI`;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		const { children } = this.props;
		const { exam, durationMin, score, isDone } = this.state;
		const {
			startExam,
			getExamById,
			handleEditExam,
			handleAddQ,
			calculateAndSendScore,
			handleEditQuestion,
			handleAddA,
			handleDeleteQuestion,
			handleEditAnswer,
			handleDeleteAnswer,
			handleAddExam,
			reset,
			deleteExam,
		} = this;

		return (
			<ExamContext.Provider
				value={{
					exam,
					startExam,
					durationMin,
					getExamById,
					handleEditExam,
					handleAddQ,
					calculateAndSendScore,
					score,
					isDone,
					handleEditQuestion,
					handleAddA,
					handleDeleteQuestion,
					handleEditAnswer,
					handleDeleteAnswer,
					handleAddExam,
					reset,
					deleteExam,
				}}>
				{children}
			</ExamContext.Provider>
		);
	}
}

export default ExamContext;

export { ExamProvider };
