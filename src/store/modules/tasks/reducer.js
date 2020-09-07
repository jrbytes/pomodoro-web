import { ActionTypes } from './types'

const INITIAL_STATE = {
  items: [],
}

const tasks = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.INITIAL_TASK_STATE: {
      const tasks = action.payload

      return Object.assign({}, state, { items: [...tasks] })
    }
    case ActionTypes.ADD_TASK_SUCCESS: {
      const { task } = action.payload

      return Object.assign({}, state, { items: [task, ...state.items] })
    }
    case ActionTypes.UPDATE_TASK_SUCCESS: {
      const { task } = action.payload

      return Object.assign({}, state, {
        items: state.items.map(item =>
          item.id === task.id ? { ...item, name: task.name } : item,
        ),
      })
    }
    default: {
      return state
    }
  }
}

export default tasks
