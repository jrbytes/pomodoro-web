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

export function addProjectFailure(projectName) {
  return {
    type: ActionTypes.ADD_PROJECT_FAILURE,
    payload: {
      projectName,
    },
  }
}
