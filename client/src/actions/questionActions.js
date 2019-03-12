import axios from 'axios';
import { GET_COURSES, GET_QUESTION, END_TIMER, GET_ERRORS } from './types';

// User get question page

export const getQuestion = () => dispatch => {
	axios
		.get(`/api/questions/5c85ecef84fd4500719acb3a/start`)
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
		.post(`/api/questions/5c85ecef84fd4500719acb3a/`, answer)
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

// REDIRECT AT TIME === 0
export const endTimer = history => dispatch => {
	console.log('ok');
	axios
		.get(`/`)
		.then(res => history.push('/'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: { error: `can't remand` },
			})
		);
};
