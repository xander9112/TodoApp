import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Login extends Component {
	render () {
		return (
			<div>Login</div>
		);
	}
}

function mapStateToProps (state) {
	"use strict";

	return {}
}

function mapDispatchToProps (dispatch) {
	"use strict";
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
