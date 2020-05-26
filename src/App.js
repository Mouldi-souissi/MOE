import React, { Component } from "react";
import "./App.css";
import Landing from "./components/Landing";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import ContactUs from "./components/ContactUs";
import CoursesDemo from "./components/CoursesDemo";
import { PrivateRoute } from "./components/PrivateRoute";
import DashInstructor from "./components/DashIstructor";
import ThemeCourses from "./components/ThemeCourses";
import Article from "./components/Article";
import AltSidebar from "./components/AltSidebar";
import Exams from "./components/Exams";
import AddExam from "./components/AddExam";
import ScoreList from "./components/ScoreList";

export class App extends Component {
	render() {
		return (
			<div className='App'>
				<Router>
					<Route path='/' render={() => <Navbar />} />
					<Switch>
						<Route exact path='/' render={() => <Landing />} />
						<Route exact path='/signUp' render={() => <SignUp />} />
						<Route exact path='/signIn' render={() => <SignIn />} />
						<Route exact path='/sidebar' render={() => <AltSidebar />} />
						<Route exact path='/exam:id' component={Exams} />
						<PrivateRoute exact path='/addExam:id' component={AddExam} />
						<PrivateRoute exact path='/scores:id' component={ScoreList} />
						<PrivateRoute path='/dashboard' component={Dashboard} />
						<PrivateRoute path='/dashboardI' component={DashInstructor} />
						<PrivateRoute path='/admin' component={Admin} />
						<PrivateRoute path='/article:id' component={Article} />
						<PrivateRoute path='/sidebar' component={AltSidebar} />
						<PrivateRoute
							exact
							path='/themeCourses/:value'
							component={ThemeCourses}
						/>
						<Route exact path='/welcome' render={() => <Welcome />} />
						<Route exact path='/aboutUs' render={() => <ContactUs />} />
						<Route exact path='/courses' render={() => <CoursesDemo />} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
