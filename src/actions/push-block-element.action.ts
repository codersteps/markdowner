import {
  MarkdownerState,
  MarkdownerElement,
  MarkdownerElements,
} from '../types'

export function pushBlockElementAction(
  state: MarkdownerState,
  payload: PushBlockElementPayload,
  elements: MarkdownerElements,
) {
  setTimeout(() => {
    payload.target.focus()
  })
  elements.push(payload)
  state.activeElementId = payload.id
}

export type PushBlockElementAction = {
  type: 'PUSH_BLOCK_ELEMENT_ACTION'
  payload: PushBlockElementPayload
}

type PushBlockElementPayload = { id: string; target: MarkdownerElement }
