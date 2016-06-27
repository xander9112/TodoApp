import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {List} from 'material-ui/List';
const { Row, Col } = require('react-flexbox-grid');
import * as taskActions from '../../actions/TaskActions'
import TasksToolbar from '../../components/Tasks/TasksToolbar'
import Task from '../../components/Tasks/Task'
import DialogForm from '../../components/Tasks/DialogForm'

class TasksIndex extends Component {
	constructor (props) {
		super(props);

		this.state = {
			open: false,
			edit: false,
			task: {}
		};
	}

	componentDidMount () {
		const { getTasks } = this.props.taskActions;

		getTasks();
	}

	editTask (data) {
		const { load } = this.props.taskActions;
		load(data);

		this.setState({
			open: true,
			edit: true,
			task: data
		});
	}

	handleClose () {
		this.setState({
			open: false,
			edit: false,
			task: {}
		});
	}

	handleOpen () {
		const { load } = this.props.taskActions;
		load({});
		this.setState({
			open: true
		});
	}

	render () {
		const { taskActions } = this.props;
		const { createTask, deleteTask } = taskActions;
		const { tasks } = this.props.tasks;
		const { task, open, edit } = this.state;

		const Tasks = tasks.map((task) => {
			return <Task task={task} key={task.id} deleteTask={deleteTask} editTask={::this.editTask}/>
		});

		return (
			<Row>
				<Col xs={12}>
					<TasksToolbar
						createTask={createTask}
						openDialog={::this.handleOpen}/>
				</Col>
				<Col xs={12}>
					{tasks.length ?
						<List>
							{Tasks}
						</List>
						:
						<Row center="xs">
							<Col xs={6}>
								<h1>
									Список задач пуст
								</h1>
							</Col>
						</Row>
					}
				</Col>
				<DialogForm open={open} isEdit={edit} data={task} actions={taskActions}
				            handleClose={::this.handleClose}/>
			</Row>
		);
	}
}

function mapStateToProps (state) {
	"use strict";
	let { tasks } = state;

	return { tasks }
}

function mapDispatchToProps (dispatch) {
	"use strict";
	return {
		taskActions: bindActionCreators(taskActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksIndex);
