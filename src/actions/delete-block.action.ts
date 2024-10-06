import { Block, MarkdownerState } from '../types'

export function deleteBlockAction(
  state: MarkdownerState,
  payload: DeleteBlockPayload,
) {
  state.activeTooltip = null
  state.blocks.splice(payload.block.pos, 1)

  for (let i = 0; i < state.blocks.length; i++) {
    state.blocks[i].pos = i
  }
}

export type DeleteBlockAction = {
  type: 'DELETE_BLOCK_ACTION'
  payload: DeleteBlockPayload
}

type DeleteBlockPayload = { block: Block }
