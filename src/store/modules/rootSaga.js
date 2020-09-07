import { all } from 'redux-saga/effects'

import projects from './projects/sagas'
import tasks from './tasks/sagas'

export default function* rootSaga() {
  return yield all([projects, tasks])
}
