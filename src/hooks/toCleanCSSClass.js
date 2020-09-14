import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'

export function useToCleanCSSClass() {
  const dispatch = useDispatch()

  const [colorWhenUpdating, setColorWhenUpdating] = useState('')

  const toCleanStateRedux = useCallback(() => {
    dispatch({ type: 'REMOVE_COLOR_WHEN_UPDATING' })
  }, [dispatch])

  useEffect(() => {
    let isSubscribed = true

    function toCleanClass() {
      if (colorWhenUpdating.length) {
        setTimeout(() => {
          toCleanStateRedux()
          if (isSubscribed) return setColorWhenUpdating('')
        }, 3000)
      }
    }
    toCleanClass()

    return () => (isSubscribed = false)
  }, [colorWhenUpdating, toCleanStateRedux])

  return [colorWhenUpdating, setColorWhenUpdating]
}
