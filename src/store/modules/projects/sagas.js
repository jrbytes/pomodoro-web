import { all, takeLatest, put } from 'redux-saga/effects'
import { addProjectSuccess, updateProjectSuccess } from './actions'
import { ActionTypes } from './types'
import { addColorWhenUpdating } from '../defaultConfig/actions'
import api from '../../../services/api'

function* createProject({ payload }) {
  const { project } = payload

  const { data } = yield api.post('projects', {
    name: project.name,
    color: 'violet',
  })

  yield put(addColorWhenUpdating(data.id))
  yield put(addProjectSuccess(data))
}

function* updateProject({ payload }) {
  const { data } = yield api.patch(`projects/${payload.id}`, {
    name: payload.name,
    color: payload.color,
  })

  yield put(addColorWhenUpdating(data.id))
  yield put(updateProjectSuccess(data))
}

export default all([
  takeLatest(ActionTypes.ADD_PROJECT_REQUEST, createProject),
  takeLatest(ActionTypes.UPDATE_PROJECT_REQUEST, updateProject),
])
