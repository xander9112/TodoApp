import {
	LOAD
} from '../constants/Task'

const initialState = {
	currentTask: {},
	error:       ''
};

export default function tasks (state = initialState, action) {
	switch (action.type) {
		case LOAD:
			return { ...state, currentTask: action.payload, error: '' };
		default:
			return state
	}
}
