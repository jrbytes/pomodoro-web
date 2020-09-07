export function initialProjectState(projects) {
  return {
    type: 'INITIAL_PROJECT_STATE',
    payload: {
      projects,
    },
  }
}

export function addProjectRequest(project) {
  return {
    type: 'ADD_PROJECT_REQUEST',
    payload: {
      project,
    },
  }
}

export function addProjectSuccess(project) {
  return {
    type: 'ADD_PROJECT_SUCCESS',
    payload: {
      project,
    },
  }
}

export function addProjectFailure(projectName) {
  return {
    type: 'ADD_PROJECT_FAILURE',
    payload: {
      projectName,
    },
  }
}
