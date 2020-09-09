import { ActionTypes } from './types'

export function initialPomoState(pomodoro) {
  return {
    type: ActionTypes.INITIAL_POMO_STATE,
    payload: {
      pomodoro,
    },
  }
}

export function updatePomoRequest(pomodoro) {
  return {
    type: ActionTypes.UPDATE_POMO_REQUEST,
    payload: {
      pomodoro,
    },
  }
}

export function updatePomoSuccess(pomodoro) {
  return {
    type: ActionTypes.UPDATE_POMO_SUCCESS,
    payload: {
      pomodoro,
    },
  }
}

export function updatePomoFailure(pomodoroId) {
  return {
    type: ActionTypes.UPDATE_POMO_FAILURE,
    payload: {
      pomodoroId,
    },
  }
}
