import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Paper, RaisedButton} from 'material-ui';
import {Link} from 'react-router';

const style = {
	textAlign: 'center',
	padding:   '10px 10px 1.78rem 10px',
	margin:    '0.75rem 0'
};

const deviderStyle = {
	padding: '0 20px'
};

class Index extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		const { user } = this.props.user;

		return (
			<Paper style={style} zDepth={2}>
				<h2>Простой TODO</h2>
				<p className="flow-text">
					Простой Todo написанный на Laravel + React + Redux
				</p>

				{user.id ?
					<RaisedButton
						label="Создать таск" primary={true}
						linkButton={true}
						containerElement={<Link to="/tasks" />}
					/>
					:
					<div>
						<RaisedButton
							label="Войти" primary={true}
							linkButton={true}
							containerElement={<Link to="/auth/login" />}
						/>
						<span style={deviderStyle}>
							|
						</span>
						<RaisedButton
							label="Зарегистрироваться" secondary={true}
							linkButton={true}
							containerElement={<Link to="/auth/registration" />}
						/>
					</div>
				}
			</Paper>
		);
	}
}

Index.propTypes = {};

function mapStateToProps (state) {
	return {
		user: state.user
	}
}

function mapDispatchToProps (dispatch) {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
