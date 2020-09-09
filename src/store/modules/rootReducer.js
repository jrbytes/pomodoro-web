import { combineReducers } from 'redux'
import defaultConfig from './defaultConfig/reducer'
import projects from './projects/reducer'
import tasks from './tasks/reducer'
import completedTasks from './completedTasks/reducer'
import pomodoro from './pomodoro/reducer'

export default combineReducers({
  defaultConfig,
  projects,
  tasks,
  completedTasks,
  pomodoro,
})
