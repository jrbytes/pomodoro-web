import { ActionTypes } from './types'

const INITIAL_STATE = {
  items: [],
}

const tasks = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.INITIAL_COMPLETE_TASK_STATE: {
      const { completedTasks } = action.payload

      return Object.assign({}, state, { items: [...completedTasks] })
    }
    case ActionTypes.TASK_COMPLETE_SUCCESS: {
      const { taskId } = action.payload

      return Object.assign({}, state, {
        items: state.items.filter(item => item.id !== taskId),
      })
    }
    case ActionTypes.TASK_RECOVERY_SUCCESS: {
      const { taskId } = action.payload

      return Object.assign({}, state, {
        items: state.items.filter(item => item.id !== taskId),
      })
    }
    default: {
      return state
    }
  }
}

export default tasks
