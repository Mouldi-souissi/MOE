import React, { Component } from "react";
import ReactQuill from "react-quill";

export class TextEditor extends Component {
	constructor(props) {
		super(props);
		this.state = { text: "" }; // You can also pass a Quill Delta here
		this.handleChange = this.handleChange.bind(this);
	}

	modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
			],
			["link", "image"],
			["clean"],
		],
	};

	formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
		"link",
		"image",
	];

	handleChange(value) {
		this.setState({ text: value });
	}

	render() {
		return (
			<ReactQuill
				modules={this.modules}
				formats={this.formats}
				value={this.state.text}
				onChange={this.handleChange}
				theme='snow'
			/>
		);
	}
}

export default TextEditor;
