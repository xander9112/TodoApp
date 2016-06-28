import {LOAD} from '../constants/Task';

export function updateTask () {
	"use strict";

	return next => action => {
		if (action.type === LOAD) {
			action.payload.description = action.payload.description == null ? '' : action.payload.description;
		}

		next(action);
	}
}
