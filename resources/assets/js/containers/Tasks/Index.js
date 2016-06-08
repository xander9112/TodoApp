import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Index extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div>Index</div>
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

Index.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
