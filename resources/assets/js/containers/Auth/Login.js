import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userActions from '../../actions/UserActions'
import {Paper, TextField, RaisedButton} from 'material-ui';
import {
	FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
	FormsySelect, FormsyText, FormsyTime, FormsyToggle
} from 'formsy-material-ui/lib';

import {browserHistory} from 'react-router'

const style = {
	position:  'absolute',
	top:       '50%',
	left:      '50%',
	transform: 'translate(-50%, -50%)',
	textAlign: 'center',
	padding:   '50px'
};

class Login extends Component {
	constructor (props) {
		super(props);

		this.state = {
			validationErrors: {},
			canSubmit:        false
		}
	}

	componentDidMount () {
		let { user } = this.props.user;

		if (user.id) {
			browserHistory.push('/');
		}
	}

	componentWillReceiveProps (props) {
		let { user } = props.user;

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

		userActions.handleLogin(model);
	}

	validateForm (values) {
		if (!values.email) {
			this.setState({
				validationErrors: {
					email: 'Поле обязятельно для заполнения'
				}
			});
		} else if (!values.password) {
			this.setState({
				validationErrors: {
					password: 'Поле обязятельно для заполнения'
				}
			});
		} else {
			this.setState({
				validationErrors: {}
			});
		}
	}

	mapInputs (inputs) {
		return {
			'email':    inputs.email,
			'password': inputs.password
		};
	}

	render () {
		const { canSubmit, validationErrors } = this.state;

		return (
			<Paper style={style} zDepth={5}>
				<Formsy.Form
					method="POST"
					onValidSubmit={::this.handleSubmit}
					ref="LoginForm"
					mapping={::this.mapInputs}
					onChange={::this.validateForm}
					onValid={::this.enableButton}
					onInvalid={::this.disableButton}
					validationErrors={validationErrors}>
					<div>
						<FormsyText
							name="email"
							validations="isEmail"
							required
							hintText="Email"
						/>
					</div>
					<div>
						<FormsyText
							name="password"
							hintText="Пароль"
							required
							type="password"
						/>
					</div>
					<br/>
					<RaisedButton type="submit" label="Войти" disabled={!canSubmit} primary={true}/>
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
 Login.propTypes = {
 fields:       PropTypes.object.isRequired,
 handleSubmit: PropTypes.func.isRequired,
 error:        PropTypes.string,
 resetForm:    PropTypes.func.isRequired,
 submitting:   PropTypes.bool.isRequired
 };
 */

/*Login = reduxForm({
 form: 'LoginForm',
 fields,
 validate
 /!*initialValues:   {
 // 'name', 'email', 'password', 'password_confirmation'
 name:                  'AlexZander',
 // email:                 'xander91@mail.ru',
 password:              '3277530',
 password_confirmation: '3277530',
 }*!/
 })(Login);*/

export default connect(mapStateToProps, mapDispatchToProps)(Login);
