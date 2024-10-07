import { MarkdownerState, Block, MarkdownerElements } from '../types'

export function moveBlockUpAction(
  state: MarkdownerState,
  payload: MoveBlockUpPayload,
  elements: MarkdownerElements,
) {
  const idx = state.blocks.findIndex((block) => block.id === payload.block.id)
  if (idx === -1) {
    return
  }

  if (idx === 0) {
    const removedBlock = state.blocks.shift()
    if (removedBlock) {
      state.blocks.push(removedBlock)
    }
  } else if (idx > 0) {
    const [removedBlock] = state.blocks.splice(idx, 1)
    state.blocks.splice(idx - 1, 0, removedBlock)
  }

  state.activeTooltip = null
  state.activeElementId = payload.block.id

  setTimeout(() => {
    elements[idx].target.focus()
    elements[idx].target.setSelectionRange(
      elements[idx].target.value.length,
      elements[idx].target.value.length,
    )
  })
}

export type MoveBlockUpAction = {
  type: 'MOVE_BLOCK_UP_ACTION'
  payload: MoveBlockUpPayload
}

type MoveBlockUpPayload = { block: Block }
