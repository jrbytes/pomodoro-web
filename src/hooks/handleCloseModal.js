import { useEffect } from 'react'

export function useHandleCloseModal(props) {
  const { openModal, errors, clearErrors, reset } = props

  useEffect(() => {
    if (!openModal && errors) {
      setTimeout(() => {
        clearErrors()
        reset()
      }, 200)
    }
  }, [openModal, errors, clearErrors, reset])

  function closeModalClickingOutside(e) {
    const click = props.closeModalRef.current.className
    if (e === click) {
      return props.closeModal()
    }
  }

  const handleEsc = e => {
    if (e.keyCode === 27) {
      return props.closeModal()
    }
  }

  return [handleEsc, closeModalClickingOutside]
}
