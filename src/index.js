import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UserProvider } from "./UserContext";
import { ProfileProvider } from "./ProfileContext";
import { ThemeProvider } from "./ThemeContext";
import { ExamProvider } from "./ExamContext";
import { CourseProvider } from "./CourseContext";

ReactDOM.render(
	<CourseProvider>
		<ExamProvider>
			<ThemeProvider>
				<ProfileProvider>
					<UserProvider>
						<App />
					</UserProvider>
				</ProfileProvider>
			</ThemeProvider>
		</ExamProvider>
	</CourseProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
