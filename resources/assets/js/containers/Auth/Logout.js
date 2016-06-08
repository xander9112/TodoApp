import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userActions from '../../actions/UserActions'
import {browserHistory} from 'react-router'

class Logout extends Component {
	componentDidMount () {
		let { userActions } = this.props;

		userActions.handleLogout();
	}

	componentWillReceiveProps (props) {
		let { user } = props.user;

		if (!user.id) {
			browserHistory.push('/auth/login');
		}
	}

	render () {
		return (
			<div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
