import {
	ADD_TASK_SUCCESS,
	UPDATE_TASK_SUCCESS,
	DELETE_TASK_SUCCESS,
	GET_TASKS_SUCCESS
} from '../constants/Task'
import {TaskModel} from '../models/TaskModel';
import {showMessage} from './AppActions';
import {createAction} from 'redux-actions';

export const addTask = createAction(ADD_TASK_SUCCESS);
export const getTask = createAction(GET_TASKS_SUCCESS);
export const updateTaskAction = createAction(UPDATE_TASK_SUCCESS);
export const deleteTaskAction = createAction(DELETE_TASK_SUCCESS);

export function getTasks () {
	return function (dispatch) {
		return TaskModel.getTasks().then((response) => {
			return response.data;
		}).then((data) => {
			if (data.success) {
				dispatch(getTask(data.tasks));
			} else {
				if (data.message) {
					dispatch(getTask(new Error(data.message)));
					dispatch(showMessage(new Error(data.message)));
				} else {
					dispatch(getTask({ errors: data }));
				}
			}
		});
	}
}

export function createTask (formValue, resolve, reject) {
	return function (dispatch) {
		return TaskModel.createTask(formValue).then((response) => {
			return response.data;
		}).then((data) => {
			if (data.success) {
				dispatch(addTask(data.tasks));
				dispatch(showMessage(data.message));
				resolve();
			} else {
				if (data.message) {
					dispatch(addTask(new Error(data.message)));
					dispatch(showMessage(new Error(data.message)));
					reject({ _error: data.message });
				} else {
					dispatch(addTask({ errors: data }));
					reject({ ...data });
				}
			}
		});
	}
}

export function updateTask (formValue, resolve, reject) {
	return function (dispatch) {
		return TaskModel.updateTask(formValue).then((response) => {
			return response.data;
		}).then((data) => {
			if (data.success) {
				dispatch(updateTaskAction(data.tasks));
				dispatch(showMessage(data.message));
				resolve();
			} else {
				if (data.message) {
					dispatch(updateTaskAction(new Error(data.message)));
					dispatch(showMessage(new Error(data.message)));
					reject({ _error: data.message });
				} else {
					dispatch(updateTaskAction({ errors: data }));
					reject({ ...data });
				}
			}
		});
	}
}

export function deleteTask (id) {
	return function (dispatch) {
		return TaskModel.deleteTask(id).then((response) => {
			return response.data;
		}).then((data) => {
			if (data.success) {
				dispatch(deleteTaskAction(data.tasks));
				dispatch(showMessage(data.message));
			} else {
				if (data.message) {
					dispatch(deleteTaskAction(new Error(data.message)));
					dispatch(showMessage(new Error(data.message)));
				} else {
					dispatch(deleteTaskAction({ errors: data }));
				}
			}
		});
	}
}
