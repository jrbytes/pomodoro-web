import { all } from 'redux-saga/effects'

import projects from './projects/sagas'

export default function* rootSaga() {
  return yield all([projects])
}
