import { ActionTypes } from './types'

export function initialCompletedTaskState(completedTasks) {
  return {
    type: ActionTypes.INITIAL_COMPLETE_TASK_STATE,
    payload: {
      completedTasks,
    },
  }
}

export function taskCompleteRequest(taskId) {
  return {
    type: ActionTypes.TASK_COMPLETE_REQUEST,
    payload: {
      taskId,
    },
  }
}

export function taskCompleteSuccess(taskId) {
  return {
    type: ActionTypes.TASK_COMPLETE_SUCCESS,
    payload: {
      taskId,
    },
  }
}

export function taskCompleteFailure(taskId) {
  return {
    type: ActionTypes.TASK_COMPLETE_FAILURE,
    payload: {
      taskId,
    },
  }
}

export function taskRecoveryRequest(taskId) {
  return {
    type: ActionTypes.TASK_RECOVERY_REQUEST,
    payload: {
      taskId,
    },
  }
}

export function taskRecoverySuccess(taskId) {
  return {
    type: ActionTypes.TASK_RECOVERY_SUCCESS,
    payload: {
      taskId,
    },
  }
}

export function taskRecoveryFailure(taskId) {
  return {
    type: ActionTypes.TASK_RECOVERY_FAILURE,
    payload: {
      taskId,
    },
  }
}
