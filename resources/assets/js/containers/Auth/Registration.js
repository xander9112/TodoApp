import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as userActions from '../../actions/UserActions'
import _ from 'lodash';
import {reduxForm} from 'redux-form';

export const fields = [ 'name', 'email', 'password', 'password_confirmation' ];
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

class Registration extends Component {
	constructor (props) {
		super(props);

		this.state = {
			form: [
				{
					field:       'name',
					description: 'Имя',
					isRequired:  true,
					type:        'text',
					value:       ''
				},
				{
					field:       'email',
					description: 'Email адрес',
					isRequired:  true,
					type:        'email',
					value:       ''
				},
				{
					field:       'password',
					description: 'Пароль',
					isRequired:  true,
					type:        'password',
					value:       ''
				},
				{
					field:       'password_confirmation',
					description: 'Подтверждение пароля',
					isRequired:  true,
					type:        'password',
					value:       ''
				}
			]
		};
	}

	onSubmit (event) {
		event.preventDefault();
		let { userActions, values } = this.props;
		userActions.postRegistration(values);
	}

	render () {
		const { fields: { name, email, password, password_confirmation }, handleSubmit } = this.props;
		let { valid } = this.props;

		return (
			<div>
				<form>
					<TextField
						hintText='Имя'
						errorText={(name.touched && name.error) ? name.error: ''}
						{...name}
					/><br/>
					<TextField
						hintText='Email'
						errorText={(email.touched && email.error) ? email.error: ''}
						{...email}
					/><br/>
					<TextField
						hintText='Пароль'
						errorText={(password.touched && password.error) ? password.error: ''}
						{...password}
					/><br/>
					<TextField
						hintText='Повторите пароль'
						errorText={(password_confirmation.touched && password_confirmation.error) ? password_confirmation.error: ''}
						{...password_confirmation}
					/><br/>
					<FlatButton label="Зарегистрироваться" disabled={!valid} onTouchTap={::this.onSubmit}/>
				</form>
			</div>
		);
	}
}

function mapStateToProps (state) {
	"use strict";
	console.log(state);
	return {}
}

function mapDispatchToProps (dispatch) {
	"use strict";
	return {
		userActions: bindActionCreators(userActions, dispatch)
	}
}


Registration = reduxForm({
	form: 'RegistrationForm',
	      fields,
	      validate
})(Registration);

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
