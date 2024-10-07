import { uniqueId } from '../lib'
import { MarkdownerElements, MarkdownerState, Paragraph } from '../types'

export function createParagraphAction(
  state: MarkdownerState,
  elements: MarkdownerElements,
) {
  const paragraph: Paragraph = {
    id: uniqueId(),
    text: '',
    type: 'paragraph',
    html: '',
  }

  if (state.activeElementId === null) {
    state.blocks.push(paragraph)
    return
  }

  const idx = state.blocks.findIndex(({ id }) => id === state.activeElementId)
  if (idx !== -1) {
    state.blocks.splice(idx + 1, 0, paragraph)
  }

  setTimeout(() => {
    elements[idx].target.focus()
  })
}

export type CreateParagraphAction = {
  type: 'CREATE_PARAGRAPH_ACTION'
}
