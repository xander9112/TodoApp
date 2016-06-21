import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Snackbar from 'material-ui/Snackbar';
import NavBar from './NavBar';
const { Grid, Row, Col } = require('react-flexbox-grid');
import * as userActions from '../actions/UserActions'
import * as appActions from '../actions/AppActions'
import {red500, green500} from 'material-ui/styles/colors';

class App extends Component {
	constructor (props) {
		super(props);
	}

	handleRequestClose () {
		const { appActions } = this.props;
		appActions.clearMessage();
	}

	render () {
		const { app } = this.props;
		const style = {
			'left':   '50px',
			'right':  'inherit',
			'bottom': '50px'
		};

		const error = {
			backgroundColor: red500
		};

		const success = {
			backgroundColor: green500
		};

		return (
			<div>
				<NavBar />
				<Grid fluid={true}>
					<Row>
						<Col xs={12}>
							{this.props.children}

							<Snackbar
								open={app.message.length != 0}
								message={app.message}
								style={style}
								autoHideDuration={4000}
								bodyStyle={app.error ? error : success}
								onRequestClose={::this.handleRequestClose}
							/>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

function mapStateToProps (state) {
	return {
		user: state.user,
		app:  state.app
	}
}

function mapDispatchToProps (dispatch) {
	return {
		userActions: bindActionCreators(userActions, dispatch),
		appActions:  bindActionCreators(appActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
