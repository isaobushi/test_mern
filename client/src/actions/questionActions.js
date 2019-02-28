import axios from 'axios';
import { GET_COURSES, GET_QUESTION, START_TIMER } from './types';

// User get question page

export const getQuestion = () => dispatch => {
	axios
		.get(`/api/questions/5c6f2a197d89e26466c9a039/start`)
		.then(res =>
			dispatch({
				type: GET_QUESTION,
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

export const sendAnswer = answer => dispatch => {
	console.log(answer);
	axios
		.post(`/api/questions/5c6f2a197d89e26466c9a039/`, answer)
		.then(res =>
			dispatch({
				type: GET_QUESTION,
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

export const startTimer = history => dispatch => {
	dispatch({
		type: START_TIMER,
		payload: history.push(`/profile`),
	});
};
