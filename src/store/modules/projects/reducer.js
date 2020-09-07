const INITIAL_STATE = {
  items: [],
}

const projects = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'INITIAL_PROJECT_STATE': {
      const projects = action.payload

      return Object.assign({}, state, { items: [...projects] })
    }
    case 'ADD_PROJECT_SUCCESS': {
      const { project } = action.payload

      return Object.assign({}, state, { items: [project, ...state.items] })
    }
    case 'ADD_PROJECT_FAILURE': {
      console.log('failure', action.payload)
      break
    }
    default: {
      return state
    }
  }
}

export default projects
