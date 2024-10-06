import { MarkdownerState, Block } from '../types'

export function moveBlockDownAction(
  state: MarkdownerState,
  payload: MoveBlockDownPayload,
  elements: Map<number, HTMLElement>,
) {
  state.activeTooltip = null

  if (payload.block.pos < state.blocks.length - 1) {
    const block = state.blocks[payload.block.pos]
    state.blocks[payload.block.pos] = state.blocks[payload.block.pos + 1]
    state.blocks[payload.block.pos + 1] = block

    for (let i = 0; i < state.blocks.length; i++) {
      state.blocks[i].pos = i
    }

    elements.get(payload.block.pos + 1)?.focus()
  }
}

export type MoveBlockDownAction = {
  type: 'MOVE_BLOCK_DOWN_ACTION'
  payload: MoveBlockDownPayload
}

type MoveBlockDownPayload = { block: Block }
