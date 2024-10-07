import { Block, MarkdownerState } from '../types'

export function deleteBlockAction(
  state: MarkdownerState,
  payload: DeleteBlockPayload,
) {
  const idx = state.blocks.findIndex((block) => block.id === payload.block.id)
  state.blocks.splice(idx, 1)
  state.activeTooltip = null
}

export type DeleteBlockAction = {
  type: 'DELETE_BLOCK_ACTION'
  payload: DeleteBlockPayload
}

type DeleteBlockPayload = { block: Block }
