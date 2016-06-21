import {
	ADD_TASK_SUCCESS,
	UPDATE_TASK_SUCCESS,
	DELETE_TASK_SUCCESS,
	GET_TASKS_SUCCESS,
} from '../constants/Task'

const initialState = {
	tasks: [],
	error: ''
};

export default function tasks (state = initialState, action) {
	switch (action.type) {
		case ADD_TASK_SUCCESS:
			return { ...state, tasks: action.payload, error: '' };
		case UPDATE_TASK_SUCCESS:
			return { ...state, tasks: action.payload, error: '' };
		case DELETE_TASK_SUCCESS:
			return { ...state, tasks: action.payload, error: '' };
		case GET_TASKS_SUCCESS:
			return { ...state, tasks: action.payload, error: '' };
		default:
			return state
	}
}
