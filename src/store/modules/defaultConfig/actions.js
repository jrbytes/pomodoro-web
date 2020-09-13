export function addColorWhenUpdating(id) {
  return {
    type: 'ADD_COLOR_WHEN_UPDATING',
    payload: {
      id,
    },
  }
}

export function removeColorWhenUpdating(id) {
  return {
    type: 'REMOVE_COLOR_WHEN_UPDATING',
    payload: {
      id,
    },
  }
}
