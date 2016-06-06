import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';
import app from './app'
import user from './user'

export default combineReducers({
	      app,
	      user,
	form: formReducer 
})
