import { ActionTypes } from './types'

export function initialTaskStateRequest(tasks) {
  return {
    type: ActionTypes.INITIAL_TASK_STATE_REQUEST,
    payload: {
      tasks,
    },
  }
}

export function initialTaskStateSuccess(tasks) {
  return {
    type: ActionTypes.INITIAL_TASK_STATE_SUCCESS,
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
