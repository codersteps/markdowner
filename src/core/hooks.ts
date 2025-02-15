import {
  useRef,
  useEffect,
  useCallback,
  FocusEventHandler,
  KeyboardEventHandler,
} from 'react'
import { Block, MarkdownerAction, MarkdownerElement } from '../types'

export function useMarkdowner(
  block: Block,
  dispatch: (action: MarkdownerAction) => void,
) {
  const ref = useRef<MarkdownerElement>(null)

  const handleBlur = useCallback<FocusEventHandler<MarkdownerElement>>(
    (e) => {
      e.preventDefault()
      dispatch({ type: 'DEACTIVATE_BLOCK', payload: {} })
    },
    [dispatch],
  )

  const handleFocus = useCallback<FocusEventHandler<MarkdownerElement>>(
    (e) => {
      e.preventDefault()
      dispatch({ type: 'ACTIVATE_BLOCK', payload: { block } })
    },
    [dispatch, block],
  )

  const handleKeyDown = useCallback<KeyboardEventHandler<MarkdownerElement>>(
    (e) => {
      dispatch({
        type: 'KEY_DOWN',
        payload: {
          key: e.key,
          withShift: e.shiftKey,
          preventDefault: () => e.preventDefault(),
        },
      })
    },
    [dispatch],
  )

  useEffect(() => {
    if (ref.current) {
      dispatch({
        type: 'ADD_ELEMENT',
        payload: { id: block.id, element: ref.current },
      })
    }

    return () => {
      dispatch({
        type: 'REMOVE_ELEMENT',
        payload: { id: block.id },
      })
    }
  }, [dispatch, block.id])

  return {
    ref,
    handleBlur,
    handleFocus,
    handleKeyDown,
  }
}
