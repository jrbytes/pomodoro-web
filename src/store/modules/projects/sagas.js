import { all, takeLatest, put, select, call } from 'redux-saga/effects'
import {
  initialProjectStateSuccess,
  addProjectSuccess,
  updateProjectSuccess,
} from './actions'
import { initialTaskStateSuccess } from '../tasks/actions'
import { ActionTypes } from './types'
import { addColorWhenUpdating } from '../defaultConfig/actions'
import api from '../../../services/api'

const getItems = state => state.projects.items

function* initialProject() {
  const { data } = yield call(api.get, 'projects')

  yield put(initialProjectStateSuccess(data))

  yield put(initialTaskStateSuccess([]))
}

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
  const previousState = yield select(getItems)
  const [compareState] = previousState.filter(item => item.id === payload.id)

  if (
    compareState.name === payload.name &&
    compareState.color === payload.color
  )
    return

  const { data } = yield api.patch(`projects/${payload.id}`, {
    name: payload.name,
    color: payload.color,
  })

  yield put(addColorWhenUpdating(data.id))
  yield put(updateProjectSuccess(data))
}

export default all([
  takeLatest(ActionTypes.INITIAL_PROJECT_STATE_REQUEST, initialProject),
  takeLatest(ActionTypes.ADD_PROJECT_REQUEST, createProject),
  takeLatest(ActionTypes.UPDATE_PROJECT_REQUEST, updateProject),
])
