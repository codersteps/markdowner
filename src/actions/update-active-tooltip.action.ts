import { Block, MarkdownerState } from '../types'

export function updateActiveTooltipAction(
  state: MarkdownerState,
  payload: UpdateActiveTooltipPayload,
) {
  state.activeTooltip = payload.activeTooltip
}

export type UpdateActiveTooltipAction = {
  type: 'UPDATE_ACTIVE_TOOLTIP_ACTION'
  payload: UpdateActiveTooltipPayload
}

type UpdateActiveTooltipPayload = { activeTooltip: Block | null }
