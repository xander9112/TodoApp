import React, {Component, PropTypes} from 'react';
import {TextField, RaisedButton} from 'material-ui';
import {reduxForm} from 'redux-form'
import CircularProgress from 'material-ui/CircularProgress';
import {red500} from 'material-ui/styles/colors';
export const fields = [ 'email', 'password' ];

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

const progressLoader = {
	position: 'absolute',
	right:    '-50px',
	top:      '-5px'
};

class LoginForm extends Component {
	constructor (props) {
		super(props);
	}

	submit (values) {
		const { submit } = this.props;

		return new Promise((resolve, reject) => {// eslint-disable-line
			submit(values, resolve, reject);
		})
	}

	render () {
		const { fields: { email, password }, error, handleSubmit, submitting } = this.props;

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
					<RaisedButton type="submit" label="Войти" disabled={submitting} primary={true}>
						{
							submitting ? <CircularProgress size={0.36} style={progressLoader}/> : ''
						}
					</RaisedButton>
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
