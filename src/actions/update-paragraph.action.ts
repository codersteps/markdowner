import { MarkdownerState, Paragraph } from '../types'

export function updateParagraphAction(
  state: MarkdownerState,
  payload: UpdateParagraphPayload,
) {
  const idx = state.blocks.findIndex((block) => block.id === payload.block.id)
  if (idx === -1) {
    return
  }

  state.blocks[idx] = payload.block
}

export type UpdateParagraphAction = {
  type: 'UPDATE_PARAGRAPH_ACTION'
  payload: UpdateParagraphPayload
}

type UpdateParagraphPayload = { block: Paragraph }
