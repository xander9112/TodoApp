import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Paper, TextField, RaisedButton, CircularProgress} from 'material-ui'
import * as userActions from '../../actions/UserActions'
import _ from 'lodash';
import $ from 'jquery';
import {browserHistory} from 'react-router'

import {
	FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
	FormsySelect, FormsyText, FormsyTime, FormsyToggle
} from 'formsy-material-ui/lib';

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
const style = {
	position:  'absolute',
	top:       '50%',
	left:      '50%',
	transform: 'translate(-50%, -50%)',
	textAlign: 'center',
	padding:   '50px'
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
			},
			error:   () => {
			}
		});
	});
};

class Registration extends Component {
	constructor (props) {
		super(props);

		this.state = {
			validationErrors: {},
			canSubmit:        false
		}
	}

	componentWillReceiveProps (props) {
		let { user } = props.user;

		if (user.id) {
			browserHistory.push('/');
		}
	}

	componentDidMount () {
		let { user } = this.props.user;

		if (user.id) {
			browserHistory.push('/');
		}
	}

	enableButton () {
		this.setState({
			canSubmit: true
		});
	}

	disableButton () {
		this.setState({
			canSubmit: false
		});
	}

	handleSubmit (model) {
		let { userActions } = this.props;
		userActions.postRegistration(model);
	}

	validateForm (values) {
		let validationErrors = {};

		if (!values.name) {
			validationErrors.name = 'Required'
		} else if (values.name.length > 15) {
			validationErrors.name = 'Must be 15 characters or less'
		} else if (!values.email) {
			validationErrors.email = 'Required'
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			validationErrors.email = 'Invalid email address'
		} else if (!values.password) {
			validationErrors.password = 'Required'
		} else if (values.password.length < 6) {
			validationErrors.password = 'Пароль должен быть не меньше 6 символов'
		} else if (!values.password_confirmation) {
			validationErrors.password_confirmation = 'Required'
		} else if (values.password_confirmation != values.password) {
			validationErrors.password = 'Пароли не совпадают'
		} else {
			validationErrors = {};
		}

		this.setState({ validationErrors });
	}

	mapInputs (inputs) {
		return {
			'name':                  inputs.name,
			'email':                 inputs.email,
			'password':              inputs.password,
			'password_confirmation': inputs.password_confirmation
		};
	}

	render () {
		const { canSubmit, validationErrors } = this.state;
		//
		return (
			<Paper style={style} zDepth={5}>
				<Formsy.Form
					method="POST"
					onValidSubmit={::this.handleSubmit}
					ref="RegistrationForm"
					mapping={::this.mapInputs}
					onChange={::this.validateForm}
					onValid={::this.enableButton}
					onInvalid={::this.disableButton}
					validationErrors={validationErrors}
				>
					<div>
						<FormsyText
							hintText="Имя"
							name="name"
							required
						/>
					</div>
					<div>
						<FormsyText
							hintText="Email"
							name="email"
							required
							type="email"
						/>
					</div>
					<div>
						<FormsyText
							hintText="Пароль"
							name="password"
							required
							type="password"
						/>
					</div>
					<div>
						<FormsyText
							hintText="Подтверждение пароля"
							name="password_confirmation"
							required
							type="password"
						/>
					</div>
					<br/>
					<RaisedButton type="submit" label="Зарегистрироваться" disabled={!canSubmit} primary={true}/>
				</Formsy.Form>
			</Paper>
		);
	}
}

function mapStateToProps (state) {
	"use strict";

	return {
		user: state.user
	}
}

function mapDispatchToProps (dispatch) {
	"use strict";
	return {
		userActions: bindActionCreators(userActions, dispatch)
	}
}


/*
 Registration = reduxForm({
 form:            'RegistrationForm',
 fields,
 validate,
 asyncValidate,
 asyncBlurFields: [ 'email' ]
 /!*initialValues:   {
 // 'name', 'email', 'password', 'password_confirmation'
 name:                  'AlexZander',
 // email:                 'xander91@mail.ru',
 password:              '3277530',
 password_confirmation: '3277530',
 }*!/
 })(Registration);
 */

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
