export function useHandleEsc() {
  const handleEsc = e => {
    if (e.keyCode === 27) return true
  }
  return [handleEsc]
}
