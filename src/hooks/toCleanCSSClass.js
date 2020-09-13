import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

export function useToCleanCSSClass() {
  const dispatch = useDispatch()

  const [colorWhenUpdating, setColorWhenUpdating] = useState('')

  useEffect(() => {
    let isSubscribed = true

    function toCleanClass() {
      if (colorWhenUpdating.length) {
        setTimeout(() => {
          dispatch({ type: 'REMOVE_COLOR_WHEN_UPDATING' })
          if (isSubscribed) return setColorWhenUpdating('')
        }, 3000)
      }
    }
    toCleanClass()

    return () => (isSubscribed = false)
  }, [colorWhenUpdating, dispatch])

  return [colorWhenUpdating, setColorWhenUpdating]
}
