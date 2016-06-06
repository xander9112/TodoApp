import $ from 'jquery';

const UserModel = {
	getLogin:  () => {
		"use strict";
		return $.ajax({
			url:    '/auth/login',
			method: 'GET'
		});
	},
	postLogin: (data) => {
		"use strict";
		return $.ajax({
			url:    '/auth/login',
			method: 'POST',
			        data
		});
	},

	postRegistration: (data) => {
		"use strict";
		return $.ajax({
			url:    '/auth/registration',
			method: 'POST',
			        data
		});
	}, 

	logout: () => {
		"use strict";

		return $.ajax({
			url:    '/auth/logout',
			method: 'GET'
		});
	}
};

export {UserModel};
