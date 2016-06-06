import {LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../constants/User';

export function storeAutentication ({ getState }) {
	"use strict";

	return next => action => {
		
		next(action);

		let state = getState();

		if (action.type === LOGIN_SUCCESS) {
			let { user } = state.user;

			localStorage.setItem('user', JSON.stringify(user));
		}

		if (action.type === LOGOUT_SUCCESS) {
			localStorage.setItem('user', '')
		}
	}
}
