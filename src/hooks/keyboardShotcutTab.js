import { useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export function useKeyboardShortcutTab() {
  let nameRef = useRef(null)

  const [countTabs, setCountTabs] = useState(0)

  const useHotkeyIfIsOne = countTabs === 0 ? 'tab' : ''

  useHotkeys(
    useHotkeyIfIsOne,
    () => {
      setCountTabs(countTabs + 1)

      setTimeout(() => {
        nameRef.current.focus()
      }, 100)
    },
    [countTabs],
  )

  return [nameRef]
}
