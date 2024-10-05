import { Block, MarkdownerState } from '../types'

export function deleteBlockAction(
  state: MarkdownerState,
  payload: DeleteBlockPayload,
) {
  state.blocks.splice(payload.block.pos, 1)
}

export type DeleteBlockAction = {
  type: 'DELETE_BLOCK_ACTION'
  payload: DeleteBlockPayload
}

type DeleteBlockPayload = { block: Block }
