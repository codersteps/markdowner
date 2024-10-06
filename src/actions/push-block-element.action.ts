import { MarkdownerElement, MarkdownerElements } from '../types'

export function pushBlockElementAction(
  payload: PushBlockElementPayload,
  elements: MarkdownerElements,
) {
  elements.set(payload.pos, payload.element)
  payload.element.focus()
}

export type PushBlockElementAction = {
  type: 'PUSH_BLOCK_ELEMENT_ACTION'
  payload: PushBlockElementPayload
}

type PushBlockElementPayload = {
  pos: number
  element: MarkdownerElement
}
