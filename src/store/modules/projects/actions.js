import { ActionTypes } from './types'

export function initialProjectState(projects) {
  return {
    type: ActionTypes.INITIAL_PROJECT_STATE,
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
