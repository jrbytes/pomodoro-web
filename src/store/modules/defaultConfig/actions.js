export function addColorWhenUpdating(id) {
  return {
    type: 'ADD_COLOR_WHEN_UPDATING',
    payload: {
      id,
    },
  }
}
