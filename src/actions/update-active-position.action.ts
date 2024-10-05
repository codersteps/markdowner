import { MarkdownerState } from '../types'

export function updateActivePositionAction(
  state: MarkdownerState,
  payload: UpdateActivePositionPayload,
) {
  state.activePosition = payload.activePosition
}

export type UpdateActivePositionAction = {
  type: 'UPDATE_ACTIVE_POSITION_ACTION'
  payload: UpdateActivePositionPayload
}

type UpdateActivePositionPayload = { activePosition: number | null }
