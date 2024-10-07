import { Block, MarkdownerElements, MarkdownerState } from '../types'

export function handleKeyAction(
  state: MarkdownerState,
  payload: HandleKeyPayload,
  elements: MarkdownerElements,
) {
  const idx = elements.findIndex((element) => element.id === payload.block.id)
  if (
    idx !== -1 ||
    !elements[idx].target ||
    elements[idx].target.selectionStart !== elements[idx].target.selectionEnd
  ) {
    return
  }

  const element = elements[idx]
  const prevElement = elements[idx - 1]
  const nextElement = elements[idx + 1]

  switch (payload.key) {
    case 'ArrowUp':
    case 'ArrowLeft':
      if (
        prevElement &&
        element.target.selectionEnd === 0 &&
        state.prevSelectionEnd === 0
      ) {
        prevElement.target.focus()
        prevElement.target.setSelectionRange(
          prevElement.target.value.length,
          prevElement.target.value.length,
        )

        state.activeElementId = prevElement.id
      }
      break
    case 'ArrowDown':
    case 'ArrowRight':
      if (
        nextElement &&
        element.target.selectionEnd === element.target.value.length &&
        state.prevSelectionEnd === element.target.value.length
      ) {
        nextElement.target.focus()
        nextElement.target.setSelectionRange(
          nextElement.target.value.length,
          nextElement.target.value.length,
        )

        state.activeElementId = nextElement.id
      }
      break
  }
}

export type HandleKeyAction = {
  type: 'HANDLE_KEY_ACTION'
  payload: HandleKeyPayload
}

type HandleKeyPayload = {
  key: string
  block: Block
}
