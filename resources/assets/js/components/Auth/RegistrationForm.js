import React, {Component, PropTypes} from 'react';
import {Paper, TextField, RaisedButton, CircularProgress} from 'material-ui';
import {reduxForm} from 'redux-form'
export const fields = [ 'name', 'email', 'password', 'password_confirmation' ];
import {browserHistory} from 'react-router'
import {red500, green500} from 'material-ui/styles/colors';
import _ from 'lodash';

const validate = values => {
	const errors = {};

	if (!values.name) {
		errors.name = 'Поле обязательно для заполнения';
	} else if (values.name.length > 15) {
		errors.name = 'Длинна не может превышать 15 символов'
	}

	if (!values.email) {
		errors.email = 'Поле обязательно для заполнения';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Не коректный Email';
	}

	if (!values.password) {
		errors.password = 'Поле обязательно для заполнения';
	} else if (values.password.length < 6) {
		errors.password = 'Пароль должен быть не меньше 6 символов';
	} else if (!values.password_confirmation) {
		errors.password_confirmation = 'Поле обязательно для заполнения';
	} else if (values.password_confirmation != values.password) {
		errors.password = 'Пароли не совпадают'
	}

	return errors;
};

const asyncValidate = (values) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			url:     '/auth/registration/validateEmail',
			method:  'POST',
			data:    {
				email: values.email
			},
			success: (response) => {
				"use strict";

				if (!_.isUndefined(response.message)) {
					reject({ email: response.message.email[ 0 ] });
				} else {
					resolve();
				}
			}
		});
	});
};

class RegistrationForm extends Component {
	constructor (props) {
		super(props);
	}

	submit (values) {
		const { submit } = this.props;

		return new Promise((resolve, reject) => {
			submit(values, resolve, reject);
		});
	}

	render () {
		const { fields: { name, email, password, password_confirmation }, error, handleSubmit, valid, asyncValidating } = this.props;

		return (
			<form onSubmit={handleSubmit(::this.submit)}>
				<div>
					<TextField
						hintText="Имя"
						errorText={name.touched && name.error && name.error}
						{...name}
					/>
				</div>
				<div>
					<TextField
						hintText="Email"
						errorText={email.touched && email.error && email.error}
						{...email}
					/>
					{asyncValidating === 'email' && <CircularProgress style={{position: 'absolute'}} size={0.5}/>}
				</div>
				<div>
					<TextField
						hintText="Пароль"
						errorText={password.touched && password.error && password.error}
						{...password}
					/>
				</div>
				<div>
					<TextField
						hintText="Подтверждение пароля"
						errorText={password_confirmation.touched && password_confirmation.error && password_confirmation.error}
						{...password_confirmation}
					/>
				</div>

				{error &&
				<div class="card-panel">
					<span style={{color: red500}}>{error}</span>
				</div>
				}
				<br/>
				<div>
					<RaisedButton type="submit" label="Зарегистрироваться" disabled={!valid} primary={true}/>
				</div>
			</form>
		);
	}
}

RegistrationForm.propTypes = {
	fields:          PropTypes.object.isRequired,
	handleSubmit:    PropTypes.func.isRequired,
	asyncValidating: PropTypes.func.isRequired,
	error:           PropTypes.string,
	resetForm:       PropTypes.func.isRequired,
	submit:          PropTypes.func.isRequired,
	submitting:      PropTypes.bool.isRequired
};

export default reduxForm({
	form:            'RegistrationForm',
	asyncBlurFields: [ 'email' ],
	                 fields,
	                 validate,
	                 asyncValidate
})(RegistrationForm);
