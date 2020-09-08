import { ActionTypes } from './types'

export function initialTaskState(tasks) {
  return {
    type: ActionTypes.INITIAL_TASK_STATE,
    payload: {
      tasks,
    },
  }
}

export function addTaskRequest(task) {
  return {
    type: ActionTypes.ADD_TASK_REQUEST,
    payload: {
      task,
    },
  }
}

export function addTaskSuccess(task) {
  return {
    type: ActionTypes.ADD_TASK_SUCCESS,
    payload: {
      task,
    },
  }
}

export function addTaskFailure(taskName) {
  return {
    type: ActionTypes.ADD_TASK_FAILURE,
    payload: {
      taskName,
    },
  }
}

export function updateTaskRequest(task) {
  return {
    type: ActionTypes.UPDATE_TASK_REQUEST,
    payload: {
      task,
    },
  }
}

export function updateTaskSuccess(task) {
  return {
    type: ActionTypes.UPDATE_TASK_SUCCESS,
    payload: {
      task,
    },
  }
}

export function updateTaskFailure(taskName) {
  return {
    type: ActionTypes.UPDATE_TASK_FAILURE,
    payload: {
      taskName,
    },
  }
}

export function deleteTaskRequest(taskId) {
  return {
    type: ActionTypes.DELETE_TASK_REQUEST,
    payload: {
      taskId,
    },
  }
}

export function deleteTaskSuccess(taskId) {
  return {
    type: ActionTypes.DELETE_TASK_SUCCESS,
    payload: {
      taskId,
    },
  }
}

export function deleteTaskFailure(taskId) {
  return {
    type: ActionTypes.DELETE_TASK_FAILURE,
    payload: {
      taskId,
    },
  }
}
