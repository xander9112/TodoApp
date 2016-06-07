import {
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_SUCCESS,
	REGISTARTION_SUCCESS,
	REGISTARTION_FAILED
} from '../constants/User'

const initialState = {
	user:  {},
	error: ''
};

export default function user (state = initialState, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return { ...state, user: action.payload, error: '' };
		case LOGOUT_SUCCESS:
			return { ...state, user: action.payload, error: '' };
		case LOGIN_FAILED:
			return { ...state, error: action.payload.message };
		case REGISTARTION_SUCCESS:
			return { ...state, user: action.payload, error: '' };
		case REGISTARTION_FAILED:
			return { ...state, errors: action.payload };
		default:
			return state
	}
}
