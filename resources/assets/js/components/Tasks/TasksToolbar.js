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

	submit (data) {
		const { createTask, resetForm } = this.props;

		return new Promise((resolve, reject) => {// eslint-disable-line
			// console.log(createTask(data, resolve, reject));

			createTask(data, resolve, reject).done(() => {
				resetForm();
				this.handleClose();
			}).fail(() => {
				console.log('fail');
			});
		});
	}

	render () {
		const { fields: { name, description }, handleSubmit, valid } = this.props;

		return (
			<Row>
				<FloatingActionButton style={style} onTouchTap={::this.handleOpen}>
					<ContentAdd />
				</FloatingActionButton>
				<Dialog
					title="Создать задачу"
					modal={false}
					open={this.state.open}
					onRequestClose={::this.handleClose}>

					<form onSubmit={handleSubmit(::this.submit)}>
						<TextField
							hintText="Новая задача"
							fullWidth={true}
							errorText={name.touched && name.error && name.error}
							{...name}
						/>
						<TextField
							hintText="Описание"
							fullWidth={true}
							multiLine={true}
							errorText={description.touched && description.error && description.error}
							{...description}
						/>

						<RaisedButton
							label="Отмена"
							primary={true}
							onTouchTap={::this.handleClose}
						/>,
						<RaisedButton
							label="Создать"
							primary={true}
							disabled={!valid}
							type="submit"
							keyboardFocused={true}
						/>
					</form>
				</Dialog>
			</Row>
		);
	}
}

TasksToolbar.propTypes = {
	fields:       PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	error:        PropTypes.string,
	resetForm:    PropTypes.func.isRequired,
	submitting:   PropTypes.bool.isRequired
};

export default reduxForm({
	form: 'NewTaskForm',
	      fields,
	      validate
})(TasksToolbar);
