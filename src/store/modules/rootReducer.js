import { combineReducers } from 'redux'
import projects from './projects/reducer'
import tasks from './tasks/reducer'
import pomodoro from './pomodoro/reducer'

export default combineReducers({
  projects,
  tasks,
  pomodoro,
})
