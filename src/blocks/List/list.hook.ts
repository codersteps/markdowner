import { useCallback, FocusEventHandler, KeyboardEventHandler } from 'react'

export function useList() {
  const handleBlur = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
    (e) => {
      e.preventDefault()
      console.log('blur')
    },
    [],
  )

  const handleFocus = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
    (e) => {
      e.preventDefault()
      console.log('focus')
    },
    [],
  )

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>(
    (e) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault()
          break
      }
    },
    [],
  )

  return {
    handleBlur,
    handleFocus,
    handleKeyDown,
  }
}
