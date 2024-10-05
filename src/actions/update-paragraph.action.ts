import { MarkdownerState, Paragraph } from '../types'

export function updateParagraphAction(
  state: MarkdownerState,
  payload: UpdateParagraphPayload,
) {
  state.blocks[payload.block.pos] = payload.block
}

export type UpdateParagraphAction = {
  type: 'UPDATE_PARAGRAPH_ACTION'
  payload: UpdateParagraphPayload
}

type UpdateParagraphPayload = { block: Paragraph }
