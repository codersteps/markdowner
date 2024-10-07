import { MarkdownerState } from '../types'

export function updateActiveElementIdAction(
  state: MarkdownerState,
  payload: UpdateActiveElementIdPayload,
) {
  state.activeElementId = payload.activeElementId
}

export type UpdateActiveElementIdAction = {
  type: 'UPDATE_ACTIVE_ELEMENT_ID_ACTION'
  payload: UpdateActiveElementIdPayload
}

type UpdateActiveElementIdPayload = { activeElementId: string | null }
