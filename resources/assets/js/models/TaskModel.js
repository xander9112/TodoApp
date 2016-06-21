import $ from 'jquery';

const TaskModel = {
	getTasks: () => {
		"use strict";
		return $.ajax({
			url:    '/tasks',
			method: 'GET'
		});
	},

	createTask: (data) => {
		"use strict";

		return $.ajax({
			url:    '/tasks',
			method: 'POST',
			        data
		});
	},

	updateTask: (data) => {
		"use strict";

		return $.ajax({
			url:    `/tasks/${data.id}`,
			method: 'PUT',
			        data
		});
	},

	deleteTask: (id) => {
		"use strict";

		return $.ajax({
			url:    `/tasks/${id}`,
			method: 'DELETE'

		});
	}
};

export {TaskModel};
