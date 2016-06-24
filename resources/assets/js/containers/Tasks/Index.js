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
			open: true
		});
	}

	handleClose () {
		this.setState({
			open: false,
			task: {}
		});
	}

	handleOpen () {
		this.setState({
			open: true
		});
	}

	render () {
		const { createTask, deleteTask } = this.props.taskActions;
		const { tasks } = this.props.tasks;
		const { task, open } = this.state;

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
								Список задач пуст
							</Col>
						</Row>
					}
				</Col>
				<DialogForm open={open} data={task} handleClose={::this.handleClose}/>
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
