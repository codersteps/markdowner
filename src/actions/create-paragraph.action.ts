import { MarkdownerState } from '../types'

export function createParagraphAction(state: MarkdownerState) {
  let pos = state.blocks.length
  if (state.activePosition) {
    pos = state.activePosition + 1
  }

  state.blocks[pos] = {
    pos,
    text: '',
    type: 'paragraph',
    html: '',
  }
}

export type CreateParagraphAction = {
  type: 'CREATE_PARAGRAPH_ACTION'
}
