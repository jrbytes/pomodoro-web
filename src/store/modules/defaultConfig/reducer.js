const INITIAL_STATE = {
  items: {},
}

const defaultConfig = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_COLOR_WHEN_UPDATING': {
      const id = action.payload

      return Object.assign({}, state, { items: { color_when_updating: id } })
    }
    case 'REMOVE_COLOR_WHEN_UPDATING': {
      return Object.assign({}, state, { items: {} })
    }
    default: {
      return state
    }
  }
}

export default defaultConfig
