import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
const { Row, Col } = require('react-flexbox-grid');

export const fields = [ 'name', 'description' ];
const validate = values => {
	const errors = {};

	if (!values.name) {
		errors.name = 'Поле обязательно для заполнения';
	}


	return errors
};


class DialogForm extends Component {
	constructor (props) {
		super(props);
	}

	submit (formData) {
		const { createTask, updateTask } = this.props.actions;
		const { isEdit, data, handleClose, resetForm } = this.props;

		return new Promise((resolve, reject) => {// eslint-disable-line
			if (isEdit) {
				const newData = { ...data, name: formData.name, description: formData.description };

				updateTask(newData, resolve, reject).done(() => {
					handleClose();
				}).fail(() => {
					console.log('fail');
				});
			} else {
				createTask(formData, resolve, reject).done(() => {
					resetForm();
					handleClose();
				}).fail(() => {
					console.log('fail');
				});
			}
		});
	}

	render () {
		const { fields: { name, description }, handleSubmit, valid, open, handleClose, isEdit } = this.props;

		const DialogTitle = isEdit ? 'Обновить задачу' : 'Создать задачу';
		const RaisedButtonLabel = isEdit ? 'Обновить' : 'Создать';

		return (
			<Dialog
				title={DialogTitle}
				modal={false}
				open={open}
				onRequestClose={handleClose}>
				<form onSubmit={handleSubmit(::this.submit)}>
					<Row>
						<Col xs={12}>
							<TextField
								hintText="Новая задача"
								fullWidth={true}
								errorText={name.touched && name.error && name.error}
								{...name}
							/>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<TextField
								hintText="Описание"
								fullWidth={true}
								multiLine={true}
								errorText={description.touched && description.error && description.error}
								{...description}
							/>
						</Col>
					</Row>
					<Row end="xs">
						<Col xs={12}>
							<RaisedButton
								label={RaisedButtonLabel}
								primary={true}
								disabled={!valid}
								type="submit"
								keyboardFocused={true}
							/>
						</Col>
					</Row>
				</form>
			</Dialog>
		);
	}
}

DialogForm.propTypes = {
	fields:       PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	error:        PropTypes.string,
	resetForm:    PropTypes.func.isRequired,
	submitting:   PropTypes.bool.isRequired
};

export default reduxForm({
		form: 'DialogForm',
		      fields,
		      validate
	}, state => ({ // mapStateToProps
		initialValues: state.currentTask.currentTask // will pull state into form's initialValues
	})
)(DialogForm);
