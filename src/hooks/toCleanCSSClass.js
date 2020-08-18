import { useState, useEffect } from 'react'

export function useToCleanCSSClass() {
  const [colorWhenUpdating, setColorWhenUpdating] = useState('')

  useEffect(() => {
    let isSubscribed = true

    function toCleanClass() {
      if (colorWhenUpdating.length) {
        setTimeout(() => {
          if (isSubscribed) return setColorWhenUpdating('')
        }, 3000)
      }
    }
    toCleanClass()

    return () => (isSubscribed = false)
  }, [colorWhenUpdating])

  return [colorWhenUpdating, setColorWhenUpdating]
}
