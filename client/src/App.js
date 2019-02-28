import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import Courses from './components/courses/Courses';
import CoursePreview from './components/courses/CoursePreview';
import Question from './components/question/Question';
import Profiles from './components/Profiles/Profile';
import Profile from './components/Profile/Profile';

import PrivateRoute from './components/common/PrivateRoute';

import './App.css';
import { clearCurrentProfile } from './actions/profileActions';

//check for token

if (localStorage.jwtToken) {
	//set the authToken header off
	setAuthToken(localStorage.jwtToken);
	// decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	// set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	//check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		//logout the user
		store.dispatch(logoutUser());
		//clear profile
		store.dispatch(clearCurrentProfile());

		//TODO! :: clear current profile
		// redirect to login
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div
						className="App"
						style={{
							height: '100vh',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						<Navbar />
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/Profiles" component={Profiles} />
							<Route exact path="/Profile/:handle" component={Profile} />

							<Switch>
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/create-profile" component={CreateProfile} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/edit-profile" component={EditProfile} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/courses" component={Courses} />
							</Switch>
							<Switch>
								<PrivateRoute path="/courses/:id_courses" component={CoursePreview} />
							</Switch>
							<Switch>
								<PrivateRoute
									exact
									path="/questions/5c6f2a197d89e26466c9a039/start"
									component={Question}
								/>
							</Switch>
						</div>
						<Footer className="mb-0" />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
