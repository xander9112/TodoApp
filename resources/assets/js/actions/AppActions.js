import {
	REQUEST_START,
	REQUEST_SUCCESS,
	REQUEST_FAILED,
	SHOW_MESSAGE
} from '../constants/App'
import {createAction, handleAction, handleActions} from 'redux-actions';

export const requestStart = createAction(REQUEST_START);
export const requestSuccess = createAction(REQUEST_SUCCESS);
export const requestFailed = createAction(REQUEST_FAILED);
export const showMessage = createAction(SHOW_MESSAGE);

