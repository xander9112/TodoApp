import React, {Component, PropTypes} from 'react';
import {ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

class Task extends Component {
	constructor (props) {
		super(props);
	}

	handleToggle (event) {
		const { task, updateTask } = this.props;

		task.completed = event.target.checked ? 1 : 0;

		updateTask(task);
	}

	editTask () {
		const { task, editTask } = this.props;

		editTask(task);
	}

	deleteTask () {
		const { task, deleteTask } = this.props;

		deleteTask(task.id);
	}

	render () {
		const { task } = this.props;
		const button = <IconButton onTouchTap={::this.deleteTask}>
			<FontIcon className="material-icons">delete</FontIcon>
		</IconButton>;

		const completed = task.completed ? <FontIcon className="material-icons">done</FontIcon> : <FontIcon />;

		return (
			<ListItem
				primaryText={task.name}
				secondaryText={task.description}
				secondaryTextLines={2}
				onTouchTap={::this.editTask}
				rightIconButton={button}
				leftIcon={completed}
			/>
		);
	}
}

Task.propTypes = {
	task: PropTypes.object
};

export default Task;
