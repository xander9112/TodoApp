import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userActions from '../../actions/UserActions'

class Logout extends Component {
	componentDidMount () {
		let { userActions } = this.props;

		userActions.handleLogout();
	}

	render () {
		const { user } = this.props;
		console.log(user);
		console.log(this.props);

		return (
			<div>Logout</div>
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
