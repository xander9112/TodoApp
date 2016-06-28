import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers/index'

import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import {updateTask} from '../containers/updateTask';

export default function configureStore (initialState) {
	const logger = createLogger({
		duration:  true,
		logErrors: true,
		collapsed: true
	});

	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk, updateTask, logger));

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers');
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}
