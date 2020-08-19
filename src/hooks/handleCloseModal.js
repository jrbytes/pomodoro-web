export function useHandleCloseModal(props) {
  function closeModalClickingOutside(e) {
    if (e === 'modal active') {
      return props.closeModal()
    }
  }

  const handleEsc = e => {
    if (e.keyCode === 27) return true
  }

  return [handleEsc, closeModalClickingOutside]
}