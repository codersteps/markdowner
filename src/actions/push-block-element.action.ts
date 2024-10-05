export function pushBlockElementAction(
  payload: PushBlockElementPayload,
  elements: Map<number, HTMLElement>,
) {
  elements.set(payload.pos, payload.element)
}

export type PushBlockElementAction = {
  type: 'PUSH_BLOCK_ELEMENT'
  payload: PushBlockElementPayload
}

type PushBlockElementPayload = {
  pos: number
  element: HTMLElement
}
