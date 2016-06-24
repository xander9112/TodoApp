import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';
import app from './app'
import user from './user'
import tasks from './tasks'
import currentTask from './currentTask'

export default combineReducers({
	      app,
	      user,
	      tasks,
	      currentTask,
	form: formReducer
})
