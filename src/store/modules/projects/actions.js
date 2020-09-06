export function addProject(project) {
  return {
    type: 'ADD_PROJECT',
    payload: {
      project,
    },
  }
}
