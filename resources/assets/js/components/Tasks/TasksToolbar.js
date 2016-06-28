import React, {Component, PropTypes} from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
const { Row } = require('react-flexbox-grid');

export const fields = [ 'name', 'description' ];

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

TasksToolbar.propTypes = {
	openDialog: PropTypes.func
};

export default TasksToolbar;
