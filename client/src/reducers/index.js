import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import profileReducer from './profileReducer';
import questionReducer from './questionReducer';

export default combineReducers({
	auth: authReducer,
	errors: errorsReducer,
	profile: profileReducer,
	questions: questionReducer,
});
