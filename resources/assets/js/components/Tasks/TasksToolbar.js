import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
const { Row } = require('react-flexbox-grid');

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export const fields = [ 'name', 'description' ];

const validate = values => {
	const errors = {};

	if (!values.name) {
		errors.name = 'Поле обязательно для заполнения';
	}


	return errors
};

const style = {
	position: 'fixed',
	right:    20,
	bottom:   20
};

class TasksToolbar extends Component {
	constructor (props) {
		super(props);

		this.state = {
			value: 3,
			open:  false
		};
	}

	handleOpen () {
		this.setState({ open: true });
	}

	handleClose () {
		this.setState({ open: false });
	}

	handleChange (event, index, value) {
		this.setState({ value })
	}

	render () {
		const { openDialog } = this.props;

		return (
			<Row>
				<FloatingActionButton style={style} onTouchTap={openDialog}>
					<ContentAdd />
				</FloatingActionButton>
			</Row>
		);
	}
}

TasksToolbar.propTypes = {};

export default TasksToolbar;
