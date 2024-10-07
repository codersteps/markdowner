import { MarkdownerState, Block, MarkdownerElements } from '../types'

export function moveBlockDownAction(
  state: MarkdownerState,
  payload: MoveBlockDownPayload,
  elements: MarkdownerElements,
) {
  const idx = state.blocks.findIndex((block) => block.id === payload.block.id)
  if (idx === -1) {
    return
  }

  if (idx + 1 === state.blocks.length) {
    const removedBlock = state.blocks.pop()
    if (removedBlock) {
      state.blocks.unshift(removedBlock)
    }
  } else if (idx !== -1) {
    const [removedBlock] = state.blocks.splice(idx, 1)
    state.blocks.splice(idx + 1, 0, removedBlock)
  }

  state.activeTooltip = null
  state.activeElementId = payload.block.id

  setTimeout(() => {
    elements[idx].target.focus()
  })
}

export type MoveBlockDownAction = {
  type: 'MOVE_BLOCK_DOWN_ACTION'
  payload: MoveBlockDownPayload
}

type MoveBlockDownPayload = { block: Block }
