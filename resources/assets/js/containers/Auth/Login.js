import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userActions from '../../actions/UserActions'
import {TextField, RaisedButton} from 'material-ui';
import {reduxForm} from 'redux-form';

export const fields = [ 'email', 'password' ];
const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'Required'
	} else if (values.name.length > 15) {
		errors.name = 'Must be 15 characters or less'
	}
	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}
	if (!values.password) {
		errors.password = 'Required'
	} else if (values.password.length < 6) {
		errors.password = 'Пароль должен быть не меньше 6 символов'
	}

	if (!values.password_confirmation) {
		errors.password_confirmation = 'Required'
	} else if (values.password_confirmation != values.password) {
		errors.password = 'Пароли не совпадают'
	}

	return errors
};


const submit = (values, dispatch) => {
	/*return new Promise((resolve, reject) => {
		// let { userActions, values } = this.props;
		//  userActions.handleLogin(values);
		setTimeout(() => {
			if (values.email != 'xander91@mail.ru') {
				reject({ email: 'User does not exist', _error: 'Login failed!' })
			} else if (values.password !== 'redux-form') {
				reject({ password: 'Wrong password', _error: 'Login failed!' })
			} else {
				resolve()
			}
		}, 1000);
	});*/
};

class Login extends Component {
	/*onSubmit (event, values/!*, dispatch*!/) {
	 event.preventDefault();

	 return new Promise((resolve, reject) => {
	 // let { userActions, values } = this.props;
	 //  userActions.handleLogin(values);
	 console.log(resolve);
	 console.log(reject);
	 setTimeout(() => {
	 if (values.email != 'xander91@mail.ru') {
	 reject({ email: 'User does not exist' })
	 } else if (values.password !== '3277530') {
	 reject({ password: 'Wrong password' })
	 } else {
	 resolve()
	 }
	 }, 1000);
	 });
	 }*/

	render () {
		const { fields: { email, password }, error, handleSubmit, submitting } = this.props;
		let { valid } = this.props;

		const style = {
			position: 'absolute'
		};
		// console.log(handleSubmit);
		return (
			<form onSubmit={handleSubmit(submit)}>
				<TextField
					hintText='Email'
					errorText={(email.touched && email.error) ? email.error: ''}
					{...email}
				/>
				<br/>
				<TextField
					hintText='Пароль'
					errorText={(password.touched && password.error) ? password.error: ''}
					{...password}
				/><br/>
				{error && <div>{error}</div>}

				<RaisedButton type="submit" label="Войти" disabled={submitting} primary={true}>
					{submitting ? <i/> : <i/>}
				</RaisedButton>
			</form>
		);
	}
}

function mapStateToProps (state) {
	"use strict";

	return {}
}

function mapDispatchToProps (dispatch) {
	"use strict";
	return {
		userActions: bindActionCreators(userActions, dispatch)
	}
}

Login.propTypes = {
	fields:       PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	error:        PropTypes.string,
	resetForm:    PropTypes.func.isRequired,
	submitting:   PropTypes.bool.isRequired
}

Login = reduxForm({
	form: 'LoginForm',
	      fields,
	      validate
	/*initialValues:   {
	 // 'name', 'email', 'password', 'password_confirmation'
	 name:                  'AlexZander',
	 // email:                 'xander91@mail.ru',
	 password:              '3277530',
	 password_confirmation: '3277530',
	 }*/
})(Login);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
