import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers/index'

import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import {storeAutentication} from '../containers/storeAutentication';

export default function configureStore (initialState) {
	const logger = createLogger();

	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk, storeAutentication/*, logger*/));

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers');
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}
