import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form'
import Dialog from 'material-ui/Dialog';
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

class EditTask extends Component {
	constructor (props) {
		super(props);
	}

	submit () {
		// const {} = this.props;

		/*return new Promise((resolve, reject) => {// eslint-disable-line
		 createTask(data, resolve, reject).done(() => {
		 resetForm();
		 this.handleClose();
		 }).fail(() => {
		 console.log('fail');
		 });
		 });*/
	}

	render () {
		const { fields: { name, description }, handleSubmit, valid, open, handleClose } = this.props;
		return (
			<Dialog
				title="Создать задачу"
				modal={false}
				open={open}
				onRequestClose={handleClose}>

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
						onTouchTap={handleClose}
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
		);
	}
}

EditTask.propTypes = {
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
})(EditTask);
