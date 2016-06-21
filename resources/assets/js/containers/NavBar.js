import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {AppBar, IconMenu, IconButton, MenuItem, Drawer} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Link} from 'react-router';
import * as userActions from '../actions/UserActions';

class NavBar extends Component {
	constructor (props) {
		super(props);

		this.state = {
			drawerOpened: false
		}
	}

	componentDidMount () {
		this.props.userActions.getAuth();
	}

	openDrawer () {
		this.setState({
			drawerOpened: true
		})
	}

	closeDrawer () {
		this.setState({
			drawerOpened: false
		})
	}

	render () {
		const { user } = this.props.user;

		const iconElementRight =
			<IconMenu
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
				{!user.id &&
				<MenuItem primaryText="Войти" linkButton={true} containerElement={<Link to="/auth/login" />}/>
				}
				{!user.id &&
				<MenuItem primaryText="Регистрация"
				          linkButton={true}
				          containerElement={<Link to="/auth/registration" />}/>
				}
				<MenuItem primaryText="Выйти"
				          linkButton={true}
				          containerElement={<Link to="/auth/logout" />}/>
			</IconMenu>;

		return (
			<AppBar
				title={user.name}
				iconElementRight={iconElementRight}
				onLeftIconButtonTouchTap={::this.openDrawer}>
				<Drawer
					docked={false}
					open={this.state.drawerOpened}
					onRequestChange={::this.closeDrawer}
				>
					<MenuItem primaryText="Главная" onTouchTap={::this.closeDrawer} linkButton={true}
					          containerElement={<Link to="/" />}/>
					<MenuItem primaryText="Задачи" onTouchTap={::this.closeDrawer} linkButton={true}
					          containerElement={<Link to="/tasks" />}/>
				</Drawer>
			</AppBar>
		);
	}
}

function mapStateToProps (state) {
	return {
		user: state.user
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
