import { ActionTypes } from './types'

const INITIAL_STATE = {
  items: [],
}

const pomodoro = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.INITIAL_POMO_STATE: {
      const { pomodoro } = action.payload

      return Object.assign({}, state, { items: pomodoro })
    }
    case ActionTypes.UPDATE_POMO_SUCCESS: {
      const { pomodoro } = action.payload

      return Object.assign({}, state, { items: pomodoro })
    }
    default: {
      return state
    }
  }
}

export default pomodoro
