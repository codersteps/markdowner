import { MarkdownerState, Block, MarkdownerElements } from '../types'

export function moveBlockUpAction(
  state: MarkdownerState,
  payload: MoveBlockUpPayload,
  elements: MarkdownerElements,
) {
  state.activeTooltip = null

  if (payload.block.pos > 0) {
    const block = state.blocks[payload.block.pos]
    state.blocks[payload.block.pos] = state.blocks[payload.block.pos - 1]
    state.blocks[payload.block.pos - 1] = block

    for (let i = 0; i < state.blocks.length; i++) {
      state.blocks[i].pos = i
    }

    elements.get(payload.block.pos - 1)?.focus()
  }
}

export type MoveBlockUpAction = {
  type: 'MOVE_BLOCK_UP_ACTION'
  payload: MoveBlockUpPayload
}

type MoveBlockUpPayload = { block: Block }
