import { MarkdownerState } from '../types'

export function updatePrevSelectionEndAction(
  state: MarkdownerState,
  payload: UpdatePrevSelectionEndPayload,
) {
  state.prevSelectionEnd = payload.prevSelectionEnd
}

export type UpdatePrevSelectionEndAction = {
  type: 'UPDATE_PREV_SELECTION_END_ACTION'
  payload: UpdatePrevSelectionEndPayload
}

type UpdatePrevSelectionEndPayload = { prevSelectionEnd: number | null }
