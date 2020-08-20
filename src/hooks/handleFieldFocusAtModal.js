import { useEffect, useRef } from 'react'

export function useHandleFieldFocusAtModal(props) {
  const nameRef = useRef(null)

  useEffect(() => {
    if (props.openModal) {
      setTimeout(() => {
        nameRef.current.focus()
      }, 100)
    }
  }, [props.openModal])

  return [nameRef]
}
