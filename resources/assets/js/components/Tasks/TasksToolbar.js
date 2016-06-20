import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';

export const fields = [ 'name', 'description' ];

const validate = values => {
	const errors = {};

	if (!values.name) {
		errors.name = 'Поле обязательно для заполнения';
	}


	return errors
};

class TasksToolbar extends Component {
	constructor (props) {
		super(props);

		this.state = {
			value: 3,
		};
	}

	handleChange (event, index, value) {
		this.setState({ value })
	}

	submit () {
		console.log('fasfasfsa');
	}


	render () {
		const { fields: { name, description }, error, handleSubmit, submitting, valid } = this.props;

		return (
			<div>
				<Toolbar>
					<ToolbarGroup firstChild={true}>
						<DropDownMenu value={this.state.value} onChange={::this.handleChange}>
							<MenuItem value={1} primaryText="All Broadcasts"/>
							<MenuItem value={2} primaryText="All Voice"/>
							<MenuItem value={3} primaryText="All Text"/>
							<MenuItem value={4} primaryText="Complete Voice"/>
							<MenuItem value={5} primaryText="Complete Text"/>
							<MenuItem value={6} primaryText="Active Voice"/>
							<MenuItem value={7} primaryText="Active Text"/>
						</DropDownMenu>
					</ToolbarGroup>
					<ToolbarGroup>
						<FontIcon className="muidocs-icon-custom-sort"/>
						<ToolbarSeparator />
						<RaisedButton
							label="Создать задачу"
							primary={true}
							disabled={!valid}
							onTouchTap={::this.submit}/>
					</ToolbarGroup>
				</Toolbar>
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
				</form>
			</div>
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
