import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {AppBar, IconMenu, IconButton, MenuItem} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Link} from 'react-router';
import * as userActions from '../actions/UserActions';

class NavBar extends Component {
	componentDidMount () {
		this.props.userActions.getAuth();
	}

	render () {
		const { user } = this.props;

		const iconElementRight =
			<IconMenu
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
				<MenuItem primaryText="Войти" linkButton={true} containerElement={<Link to="/auth/login" />}/>
				<MenuItem primaryText="Регистрация"
				          linkButton={true}
				          containerElement={<Link to="/auth/registration" />}/>
				<MenuItem primaryText="Выйти"
				          linkButton={true}
				          containerElement={<Link to="/auth/logout" />}/>
			</IconMenu>;

		return (
			<div>
				<AppBar
					title={user.name}
					iconElementRight={iconElementRight}>
				</AppBar>
			</div>
		);
	}
}

function mapStateToProps (state) {
	return {
		// user: state.user,
		// page: state.page
	}
}

function mapDispatchToProps (dispatch) {
	return {
		// pageActions: bindActionCreators(pageActions, dispatch),
		userActions: bindActionCreators(userActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
