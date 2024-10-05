import {
  deleteBlockAction,
  createParagraphAction,
  updateParagraphAction,
  pushBlockElementAction,
  updateActiveTooltipAction,
  updateActivePositionAction,
} from '../actions'
import { MarkdownerAction, MarkdownerState } from '../types'

const elements: Map<number, HTMLElement> = new Map()

export function markdownerReducer(
  draft: MarkdownerState,
  action: MarkdownerAction,
) {
  switch (action.type) {
    case 'PUSH_BLOCK_ELEMENT':
      pushBlockElementAction(action.payload, elements)
      break
    case 'CREATE_PARAGRAPH_ACTION':
      console.log(elements)
      createParagraphAction(draft)
      break
    case 'UPDATE_PARAGRAPH_ACTION':
      updateParagraphAction(draft, action.payload)
      break
    case 'DELETE_BLOCK_ACTION':
      deleteBlockAction(draft, action.payload)
      break
    case 'UPDATE_ACTIVE_TOOLTIP_ACTION':
      updateActiveTooltipAction(draft, action.payload)
      break
    case 'UPDATE_ACTIVE_POSITION_ACTION':
      updateActivePositionAction(draft, action.payload)
      break
    default:
      throw Error('Unknown action')
  }
}
