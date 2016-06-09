import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userActions from '../../actions/UserActions'
import LoginForm from '../../components/Auth/LoginForm'
import {Paper, TextField, RaisedButton} from 'material-ui';
import {browserHistory} from 'react-router'

class Login extends Component {
	constructor (props) {
		super(props);
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

	handleSubmit (model, resolve, reject) {
		let { userActions } = this.props;

		userActions.handleLogin(model, resolve, reject);
	}

	render () {
		return (
			<div className="b-modal-form-container">
				<Paper className="b-form-paper" zDepth={5}>
					<LoginForm submit={::this.handleSubmit}/>
				</Paper>
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
