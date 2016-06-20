import React, {Component, PropTypes} from 'react';
import {List, ListItem} from 'material-ui/List';
import Toggle from 'material-ui/Toggle';

class Task extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<List>
				<ListItem
					primaryText="Profile photo"
					secondaryText="Change your Google+ profile photo"
					rightToggle={<Toggle />}
				/>
			</List>
		);
	}
}

Task.propTypes = {};

export default Task;
