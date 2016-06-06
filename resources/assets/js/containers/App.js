import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Snackbar from 'material-ui/Snackbar';
import NavBar from './NavBar';

import * as userActions from '../actions/UserActions'
// import * as AppActions from '../actions/AppActions'

import {red500, green500} from 'material-ui/styles/colors';

class App extends Component {
	componentDidMount () {
		// this.props.userActions.getAuth();
	}

	render () {
		const { app } = this.props;
		// const { handleLogin, handleLogout } = this.props.userActions;
		const style = {
			'left':   'inherit',
			'right':  '50px',
			'bottom': '50px'
		};

		const error = {
			backgroundColor: red500
		};

		const success = {
			backgroundColor: green500
		};


		return (
			<div className="row">
				<NavBar />
				<div className="col s12">
					{this.props.children}

					<Snackbar
						open={app.message.length != 0}
						message="fasfa"
						style={style}
						autoHideDuration={4000}
						// onRequestClose={this.handleRequestClose}
					/>
				</div>
			</div>
		);
		// bodyStyle={}
		/*user.error.length ? error: success*/
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
		// pageActions: bindActionCreators(pageActions, dispatch),
		userActions: bindActionCreators(userActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
