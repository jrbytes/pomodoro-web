import { all } from 'redux-saga/effects'

import projects from './projects/sagas'
import tasks from './tasks/sagas'
import completedTasks from './completedTasks/sagas'
import pomodoro from './pomodoro/sagas'

export default function* rootSaga() {
  return yield all([projects, tasks, completedTasks, pomodoro])
}
