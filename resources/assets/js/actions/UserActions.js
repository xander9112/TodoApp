import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_SUCCESS,
	REGISTARTION_REQUEST,
	REGISTARTION_SUCCESS,
	REGISTARTION_FAILED
} from '../constants/User'
import {createAction} from 'redux-actions';
import {UserModel} from '../models/UserModel';
import {showMessage} from './AppActions';

const loginSuccess = createAction(LOGIN_SUCCESS);
const logoutSuccess = createAction(LOGOUT_SUCCESS);
const loginFailed = createAction(LOGIN_FAILED);
const registrationSuccess = createAction(REGISTARTION_SUCCESS);
const registrationFailed = createAction(REGISTARTION_FAILED);

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

export function handleLogin (formValue, resolve, reject) {
	return function (dispatch) {
		dispatch({
			type: LOGIN_REQUEST
		});

		return UserModel.postLogin(formValue).then((response) => {
			return response.data;
		}).then((data) => {
			if (data.success) {
				dispatch(loginSuccess(data.user));
				dispatch(showMessage(data.message));
				resolve();
			} else {
				if (data.message) {
					dispatch(loginFailed(new Error(data.message)));
					dispatch(showMessage(new Error(data.message)));
					reject({ _error: data.message });
				} else {
					dispatch(loginFailed({ errors: data }));
					reject({ ...data });
				}
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
				dispatch(logoutSuccess({}))
			} else {
				dispatch(loginFailed(new Error(data.message)))
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
					dispatch(registrationFailed(data.errors));
					dispatch(showMessage(new Error(data.message)));
				}
			}
		});
	}
}
