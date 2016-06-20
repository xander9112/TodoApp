import React, {Component, PropTypes} from 'react';
import {Paper, TextField, RaisedButton} from 'material-ui';
import {reduxForm} from 'redux-form'
export const fields = [ 'email', 'password' ];
import {browserHistory} from 'react-router'
import {red500, green500} from 'material-ui/styles/colors';

const validate = values => {
	const errors = {};

	if (!values.email) {
		errors.email = 'Поле обязательно для заполнения';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Не коректный Email'
	}
	if (!values.password) {
		errors.password = 'Поле обязательно для заполнения'
	}

	return errors
};

class LoginForm extends Component {
	constructor (props) {
		super(props);
	}

	submit (values) {
		const { submit } = this.props;

		return new Promise((resolve, reject) => {
			submit(values, resolve, reject);
		})
	}

	render () {
		const { fields: { email, password }, error, handleSubmit, submitting, valid } = this.props;

		return (
			<form onSubmit={handleSubmit(::this.submit)}>
				<div>
					<TextField
						hintText="Email"
						errorText={email.touched && email.error && email.error}
						{...email}
					/>
				</div>
				<div>
					<TextField
						hintText="Пароль"
						type="password"
						errorText={password.touched && password.error && password.error}
						{...password}
					/>
				</div>
				{error &&
				<div class="card-panel">
					<span style={{color: red500}}>{error}</span>
				</div>
				}
				<br/>
				<div>
					<RaisedButton type="submit" label="Войти" disabled={!valid} primary={true}/>
				</div>
			</form>
		);
	}
}

LoginForm.propTypes = {
	fields:       PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	error:        PropTypes.string,
	resetForm:    PropTypes.func.isRequired,
	submit:       PropTypes.func.isRequired,
	submitting:   PropTypes.bool.isRequired
};

export default reduxForm({
	form: 'LoginForm',
	      fields,
	      validate
})(LoginForm);
