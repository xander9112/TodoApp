import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {List} from 'material-ui/List';
const { Row, Col } = require('react-flexbox-grid');
import * as taskActions from '../../actions/TaskActions'
import TasksToolbar from '../../components/Tasks/TasksToolbar'
import Task from '../../components/Tasks/Task'
import DialogForm from '../../components/Tasks/DialogForm'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';

class TasksIndex extends Component {
	constructor (props) {
		super(props);

		this.state = {
			open:   false,
			edit:   false,
			task:   {},
			filter: 'withDescription',
			sort:   'name'
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

	updateFilter (event, index, filter) {
		this.setState({ filter });
	}

	updateSort (event, index, sort) {
		this.setState({ sort });
	}

	render () {
		const { taskActions } = this.props;
		const { createTask, deleteTask } = taskActions;
		let { tasks } = this.props.tasks;
		const { task, open, edit, filter, sort } = this.state;

		tasks = _.sortBy(tasks, function (task) {
			return task[ sort ];
		});

		switch (filter) {
			case 'active':
				tasks = _.filter(tasks, function (task) {
					return !task.completed;
				});

				break;
			case 'withoutDescription':
				tasks = _.filter(tasks, function (task) {
					return task.description == '' || task.description == null;
				});

				break;
			case 'withDescription':
				tasks = _.filter(tasks, function (task) {
					return task.description != '' && task.description != null;
				});
		}

		const Tasks = tasks.map((task) => {
			return <Task task={task} key={task.id} deleteTask={deleteTask} editTask={::this.editTask}/>
		});

		return (
			<Row>
				<Col xs={12}>
					<Toolbar>
						<ToolbarGroup>
							<ToolbarTitle text="Показать: "/>
							<ToolbarSeparator />
							<DropDownMenu value={filter} onChange={::this.updateFilter}>
								<MenuItem value="all" primaryText="Все задачи"/>
								<MenuItem value="active" primaryText="Активные"/>
								<MenuItem value="withoutDescription" primaryText="Без описания"/>
								<MenuItem value="withDescription" primaryText="С описанием"/>
							</DropDownMenu>
						</ToolbarGroup>
						<ToolbarGroup lastChild={true}>
							<ToolbarTitle text="Сортировать по: "/>
							<ToolbarSeparator />
							<DropDownMenu value={sort} onChange={::this.updateSort}>
								<MenuItem value="name" primaryText="По алфавиту"/>
								<MenuItem value="completed" primaryText="По завершенным"/>
							</DropDownMenu>
						</ToolbarGroup>
					</Toolbar>
				</Col>
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
				<DialogForm
					open={open}
					isEdit={edit}
					data={task}
					actions={taskActions}
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
