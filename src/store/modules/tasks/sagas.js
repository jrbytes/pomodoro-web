import { all, takeLatest, put, select } from 'redux-saga/effects'
import { addTaskSuccess, updateTaskSuccess } from './actions'
import { ActionTypes } from './types'
import { addColorWhenUpdating } from '../defaultConfig/actions'
import api from '../../../services/api'

const getItems = state => state.tasks.items

function* createTask({ payload }) {
  const { task } = payload

  const { data } = yield api.post(`tasks/${task.project_id}`, {
    name: task.name,
  })

  yield put(addColorWhenUpdating(data.id))
  yield put(addTaskSuccess(data))
}

function* updateTask({ payload }) {
  const previousState = yield select(getItems)
  const [compareState] = previousState.filter(item => item.id === payload.id)

  if (compareState.name === payload.name) return

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
