import axios from 'axios';

import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER,
	GET_COURSES,
	GET_SINGLE_COURSE,
} from './types';

//GET courses
export const getCourses = () => dispatch => {
	axios
		.get('/api/courses')
		.then(res =>
			dispatch({
				type: GET_COURSES,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_COURSES,
				payload: {},
			})
		);
};

//GET single course
export const getSingleCourse = params => dispatch => {
	axios
		.get(`/api/courses/`, {
			params: {
				params,
			},
		})
		.then(res =>
			dispatch({
				type: GET_SINGLE_COURSE,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_SINGLE_COURSE,
				payload: {},
			})
		);
};

// User register one course

export const registerCourse = (params, userData) => dispatch => {
	axios
		.post(`/api/courses/${params.course_id}`, userData)
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Get current profile
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profile')
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: {},
			})
		);
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
	axios
		.post('/api/profile', profileData)
		.then(res => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Profile loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING,
	};
};

// Clear profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE,
	};
};

// Delete profile

export const deleteAccount = () => dispatch => {
	if (window.confirm('Are you sure? This can NOT be undone!')) {
		axios
			.delete('/api/profile')
			.then(res =>
				dispatch({
					type: SET_CURRENT_USER,
					payload: {},
				})
			)
			.catch(err =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				})
			);
	}
};

// GET ALL PROFILES
export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profile/all')
		.then(res =>
			dispatch({
				type: GET_PROFILES,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILES,
				payload: null,
			})
		);
};

// GET  PROFILE by Handle
export const getProfileByHandle = handle => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get(`/api/profile/handle/${handle}`)
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: null,
			})
		);
};
