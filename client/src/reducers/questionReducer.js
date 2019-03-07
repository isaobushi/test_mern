import { GET_QUESTION, END_TIMER } from '../actions/types';

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
		case END_TIMER:
			return {
				...state,
				info: action.payload,
			};
		default:
			return state;
	}
}
