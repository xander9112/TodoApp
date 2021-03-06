import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import $ from 'jquery';

injectTapEventPlugin();

const store = configureStore();

import App from './containers/App'
import Index from './containers/Index'
import TasksIndex from './containers/Tasks/Index'
import Login from './containers/Auth/Login'
import Logout from './containers/Auth/Logout'
import Registration from './containers/Auth/Registration'

$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': window.csrf_token
	}
});

const RootElement = document.getElementById('root');

// console.log('JS точто новый');

if (!!RootElement) {
	render(
		<Provider store={store}>
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<Router history={browserHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={Index}/>

						<Route path="auth">
							<Route path="login" component={Login}/>
							<Route path="registration" component={Registration}/>
							<Route path="logout" component={Logout}/>
						</Route>
						<Route path="tasks">
							<IndexRoute component={TasksIndex}/>
						</Route>
					</Route>
				</Router>
			</MuiThemeProvider>
		</Provider>,
		RootElement
	);
}
