import produce from 'immer'

const INITIAL_STATE = {
  items: [],
}

const projects = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_PROJECT': {
        const { project } = action.payload

        const projectExists = draft.items.find(
          item => item.project.name === project.name,
        )

        if (projectExists) {
          return state
        } else {
          draft.items.push({
            project,
          })
        }

        break
      }
      default: {
        return state
      }
    }
  })
}

export default projects
