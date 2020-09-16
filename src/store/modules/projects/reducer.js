import { ActionTypes } from './types'

const INITIAL_STATE = {
  items: [],
}

const projects = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.INITIAL_PROJECT_STATE: {
      const projects = action.payload

      return Object.assign({}, state, { items: [...projects] })
    }
    case ActionTypes.ADD_PROJECT_SUCCESS: {
      const { project } = action.payload

      return Object.assign({}, state, { items: [project, ...state.items] })
    }
    case ActionTypes.UPDATE_PROJECT_SUCCESS: {
      const { project } = action.payload

      return Object.assign({}, state, {
        items: state.items.map(item =>
          item.id === project.id
            ? { ...item, name: project.name, color: project.color }
            : item,
        ),
      })
    }
    default: {
      return state
    }
  }
}

export default projects
