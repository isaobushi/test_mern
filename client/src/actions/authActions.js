import axios from 'axios';
import { GET_ERRORS } from './types';
import { SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
//register user
const deakinUrl = 'http://10.137.0.158:5000';
//const deakinUrl = 'http://localhost:5000';

export const registerUser = (userData, history) => dispatch => {
	axios
		.post(`${deakinUrl}/api/users/register`, userData)
		.then(res => history.push('/login'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// login - get user token

export const loginUser = userData => dispatch => {
	axios
		.post(`${deakinUrl}/api/users/login`, userData)
		.then(res => {
			//save to localStorage
			const { token } = res.data;
			//set token to ls
			localStorage.setItem('jwtToken', token);
			//set token to auth header
			setAuthToken(token);
			//decode token to get user data
			const decoded = jwt_decode(token);
			//set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

//set logged in user

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

// log user out

export const logoutUser = () => dispatch => {
	//remove token from ls
	localStorage.removeItem('jwtToken');
	//remove the auth header for future requests
	setAuthToken(false);
	//set the current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
