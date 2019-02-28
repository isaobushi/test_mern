import { GET_QUESTION, START_TIMER } from '../actions/types';

const initialState = {
	loading: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_QUESTION:
			return {
				...state,
				exercise: action.payload,
			};
		case START_TIMER:
			return {
				...state,
				startTimer: action.payload,
			};
		default:
			return state;
	}
}
