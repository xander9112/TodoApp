import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Paper, TextField, RaisedButton, CircularProgress} from 'material-ui'
import RegistrationForm from '../../components/Auth/RegistrationForm'
import * as userActions from '../../actions/UserActions'
import {browserHistory} from 'react-router'

class Registration extends Component {
	constructor (props) {
		super(props);
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

	handleSubmit (model, resolve, reject) {
		let { userActions } = this.props;

		userActions.postRegistration(model, resolve, reject);
	}

	render () {
		return (
			<div className="b-modal-form-container">
				<Paper className="b-form-paper" zDepth={5}>
					<RegistrationForm submit={::this.handleSubmit}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
