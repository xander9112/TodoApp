import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import TasksToolbar from '../../components/Tasks/TasksToolbar'
import Task from '../../components/Tasks/Task'

class TasksIndex extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div>
				<TasksToolbar />
				<Task />
			</div>
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

TasksIndex.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(TasksIndex);
