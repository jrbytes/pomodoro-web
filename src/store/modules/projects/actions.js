import { ActionTypes } from './types'

export function initialProjectStateRequest() {
  return {
    type: ActionTypes.INITIAL_PROJECT_STATE_REQUEST,
  }
}

export function initialProjectStateSuccess(projects) {
  return {
    type: ActionTypes.INITIAL_PROJECT_STATE_SUCCESS,
    payload: {
      projects,
    },
  }
}

export function addProjectRequest(project) {
  return {
    type: ActionTypes.ADD_PROJECT_REQUEST,
    payload: {
      project,
    },
  }
}

export function addProjectSuccess(project) {
  return {
    type: ActionTypes.ADD_PROJECT_SUCCESS,
    payload: {
      project,
    },
  }
}

export function updateProjectRequest(project) {
  return {
    type: ActionTypes.UPDATE_PROJECT_REQUEST,
    payload: {
      project,
    },
  }
}

export function updateProjectSuccess(project) {
  return {
    type: ActionTypes.UPDATE_PROJECT_SUCCESS,
    payload: {
      project,
    },
  }
}
