import { all, takeLatest, select, put, call } from 'redux-saga/effects'
import {
  taskCompleteSuccess,
  taskRecoverySuccess,
  initialCompletedTaskState,
} from './actions'
import { initialTaskState } from '../tasks/actions'
import { ActionTypes } from './types'
import api from '../../../services/api'

const getItemsTask = state => state.tasks.items
const getItemsCompletedTask = state => state.completedTasks.items

function* taskComplete({ payload }) {
  const update = yield call(
    api.patch,
    `completed-tasks/${payload.id}/${payload.project_id}`,
    {
      completed: payload.completed,
    },
  )
  const previousState = yield select(getItemsTask)
  const state = previousState.filter(item => item.id !== update.data.id)
  yield put(taskCompleteSuccess(update.data.id))
  yield put(initialTaskState(state))

  const initialCompletedTask = yield call(
    api.get,
    `completed-tasks/${payload.project_id}`,
  )
  yield put(initialCompletedTaskState(initialCompletedTask.data))
}

function* taskRecovery({ payload }) {
  const update = yield call(
    api.patch,
    `completed-tasks/${payload.id}/${payload.project_id}`,
    {
      completed: payload.completed,
    },
  )
  const previousState = yield select(getItemsCompletedTask)
  const state = previousState.filter(item => item.id !== update.data.id)
  yield put(taskRecoverySuccess(update.data.id))
  yield put(initialCompletedTaskState(state))

  const initialTask = yield call(api.get, `tasks/${payload.project_id}`)
  yield put(initialTaskState(initialTask.data))
}

export default all([
  takeLatest(ActionTypes.TASK_COMPLETE_REQUEST, taskComplete),
  takeLatest(ActionTypes.TASK_RECOVERY_REQUEST, taskRecovery),
])
