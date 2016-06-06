import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTARTION_REQUEST,
	REGISTARTION_SUCCESS,
	REGISTARTION_FAIL
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
		case LOGIN_FAIL:
			return { ...state, error: action.payload.message };
		case REGISTARTION_SUCCESS:
			return { ...state, user: action.payload, error: '' };
		case REGISTARTION_FAIL:
			return { ...state, errors: action.payload.errors };

		default:
			return state
	}
}
