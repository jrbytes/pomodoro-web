import { all, takeLatest, call, put } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { updatePomoSuccess } from './actions'
import api from '../../../services/api'

function* updateIncrementPomo({ payload }) {
  const incrementPomo = yield call(api.patch, `pomos/${payload.id}`, {
    realized_pomos: payload.realized_pomos + 1,
  })
  yield put(updatePomoSuccess(incrementPomo.data))
}

export default all([
  takeLatest(ActionTypes.UPDATE_POMO_REQUEST, updateIncrementPomo),
])
