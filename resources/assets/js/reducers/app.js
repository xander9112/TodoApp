import {
	REQUEST_START,
	REQUEST_SUCCESS,
	REQUEST_FAILED,
	SHOW_MESSAGE
} from '../constants/App'

const initialState = {
	message:    '',
	showLoader: false,
	error:      ''
};

export default function user (state = initialState, action) {
	switch (action.type) {
		case REQUEST_START:
			return { ...state, showLoader: true, error: '' };
		case REQUEST_SUCCESS:
			return { ...state, showLoader: false, message: action.payload, error: '' };
		case REQUEST_FAILED:
			return { ...state, showLoader: false, error: action.payload.message };
		case SHOW_MESSAGE:
			return {
				...state,
				message: action.payload.message ? action.payload.message : action.payload,
				error:   action.error
			};


		default:
			return state
	}
}
