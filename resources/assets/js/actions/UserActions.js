import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTARTION_REQUEST,
	REGISTARTION_SUCCESS,
	REGISTARTION_FAIL
} from '../constants/User'
import {createAction, handleAction, handleActions} from 'redux-actions';
import {UserModel} from '../models/UserModel';
import {showMessage} from './AppActions';

const loginSuccess = createAction(LOGIN_SUCCESS);
const loginFailed = createAction(REGISTARTION_FAIL);
const registrationSuccess = createAction(REGISTARTION_SUCCESS);
const registrationFailed = createAction(LOGIN_FAIL);

export function getAuth () {
	"use strict";

	return function (dispatch) {
		UserModel.getLogin().then((response) => {
			return response.data
		}).then((data) => {
			if (data) {
				if (data.success) {
					dispatch(loginSuccess(data.user))
				} else {
					dispatch(loginFailed(new Error(data.errorMessage)))
				}
			}
		});
	}
}

export function handleLogin (formValue) {
	return function (dispatch) {
		dispatch({
			type: LOGIN_REQUEST
		});

		UserModel.postLogin(formValue).then((response) => {
			return response.data
		}).then((data) => {
			if (data.success) {
				dispatch(dispatch(loginSuccess(data.user)))
			} else {
				dispatch(loginFailed(new Error(data.errorMessage)))
			}
		});
	}
}

export function handleLogout () {
	return function (dispatch) {
		dispatch({
			type: LOGIN_REQUEST
		});

		UserModel.logout().then((response) => {
			"use strict";
			return response.data
		}).then((data) => {
			"use strict";
			if (data.success) {
				dispatch(loginSuccess({}))
			} else {
				dispatch(loginFailed(new Error(data.errorMessage)))
			}
		});
	}
}

export function postRegistration (data) {
	return function (dispatch) {
		"use strict";

		dispatch({
			type: REGISTARTION_REQUEST
		});

		UserModel.postRegistration(data).then((response) => {
			return response.data
		}).then((data) => {
			if (data) {
				if (data.success) {
					dispatch(registrationSuccess(data.user));
					dispatch(showMessage(data.message));
				} else {
					dispatch(registrationFailed(data.errors))
				}
			}
		});
	}
}
