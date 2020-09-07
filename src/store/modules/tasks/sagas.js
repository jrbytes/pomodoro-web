import { all, takeLatest, put } from 'redux-saga/effects'
import { addTaskSuccess, updateTaskSuccess } from './actions'
import { ActionTypes } from './types'
import { addColorWhenUpdating } from '../defaultConfig/actions'
import api from '../../../services/api'

function* createTask({ payload }) {
  const { task } = payload

  const { data } = yield api.post(`tasks/${task.project_id}`, {
    name: task.name,
  })

  yield put(addColorWhenUpdating(data.id))
  yield put(addTaskSuccess(data))
}

function* updateTask({ payload }) {
  const { data } = yield api.patch(
    `tasks/${payload.id}/${payload.project_id}`,
    {
      name: payload.name,
    },
  )

  yield put(addColorWhenUpdating(data.id))
  yield put(updateTaskSuccess(data))
}

export default all([
  takeLatest(ActionTypes.ADD_TASK_REQUEST, createTask),
  takeLatest(ActionTypes.UPDATE_TASK_REQUEST, updateTask),
])
