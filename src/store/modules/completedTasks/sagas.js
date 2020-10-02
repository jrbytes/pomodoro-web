import { all, takeLatest, select, put, call } from 'redux-saga/effects'
import {
  taskCompleteSuccess,
  taskRecoverySuccess,
  initialCompletedTaskState,
} from './actions'
import { initialTaskStateSuccess } from '../tasks/actions'
import { ActionTypes } from './types'
import api from '../../../services/api'

const getItemsTask = state => state.tasks.items
const getItemsCompletedTask = state => state.completedTasks.items

function* initialState({ payload }) {
  const { data } = yield call(api.get, `completed-tasks/${payload.project_id}`)

  yield put(initialCompletedTaskState(data))
}

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
  yield put(initialTaskStateSuccess(state))

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
  yield put(initialTaskStateSuccess(initialTask.data))
}

export default all([
  takeLatest(ActionTypes.INITIAL_COMPLETE_TASK_STATE_REQUEST, initialState),
  takeLatest(ActionTypes.TASK_COMPLETE_REQUEST, taskComplete),
  takeLatest(ActionTypes.TASK_RECOVERY_REQUEST, taskRecovery),
])
