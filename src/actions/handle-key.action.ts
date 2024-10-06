import { Block, MarkdownerElements, MarkdownerState } from '../types'

export function handleKeyAction(
  state: MarkdownerState,
  payload: HandleKeyPayload,
  elements: MarkdownerElements,
) {
  const element = elements.get(payload.block.pos)
  if (!element || element.selectionStart !== element.selectionEnd) {
    return
  }
  const prevElement = elements.get(payload.block.pos - 1)
  const nextElement = elements.get(payload.block.pos + 1)

  switch (payload.key) {
    case 'ArrowUp':
    case 'ArrowLeft':
      if (
        prevElement &&
        element.selectionEnd === 0 &&
        state.prevSelectionEnd === 0
      ) {
        state.activePosition = payload.block.pos - 1
        prevElement.focus()
        prevElement.setSelectionRange(
          prevElement.value.length,
          prevElement.value.length,
        )
      }
      break
    case 'ArrowDown':
    case 'ArrowRight':
      if (
        nextElement &&
        element.selectionEnd === element.value.length &&
        state.prevSelectionEnd === element.value.length
      ) {
        state.activePosition = payload.block.pos - 1
        nextElement.focus()
        nextElement.setSelectionRange(
          nextElement.value.length,
          nextElement.value.length,
        )
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
