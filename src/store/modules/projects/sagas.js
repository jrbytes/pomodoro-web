import { all, takeLatest, put } from 'redux-saga/effects'
import { addProjectSuccess } from './actions'
import { addColorWhenUpdating } from '../defaultConfig/actions'
import api from '../../../services/api'

function* checkProjects({ payload }) {
  const { project } = payload

  const { data } = yield api.post('projects', {
    name: project.name,
    color: 'violet',
  })

  yield put(addColorWhenUpdating(data.id))
  yield put(addProjectSuccess(data))
}

export default all([takeLatest('ADD_PROJECT_REQUEST', checkProjects)])
