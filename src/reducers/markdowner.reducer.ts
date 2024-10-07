import {
  handleKeyAction,
  deleteBlockAction,
  moveBlockUpAction,
  moveBlockDownAction,
  createParagraphAction,
  updateParagraphAction,
  pushBlockElementAction,
  updateActiveTooltipAction,
  updateActiveElementIdAction,
  updatePrevSelectionEndAction,
} from '../actions'
import { MarkdownerElements, MarkdownerAction, MarkdownerState } from '../types'

const elements: MarkdownerElements = []

export function markdownerReducer(
  draft: MarkdownerState,
  action: MarkdownerAction,
) {
  switch (action.type) {
    case 'HANDLE_KEY_ACTION':
      handleKeyAction(draft, action.payload, elements)
      break
    case 'DELETE_BLOCK_ACTION':
      deleteBlockAction(draft, action.payload)
      break
    case 'MOVE_BLOCK_UP_ACTION':
      moveBlockUpAction(draft, action.payload, elements)
      break
    case 'MOVE_BLOCK_DOWN_ACTION':
      moveBlockDownAction(draft, action.payload, elements)
      break
    case 'CREATE_PARAGRAPH_ACTION':
      createParagraphAction(draft, elements)
      break
    case 'UPDATE_PARAGRAPH_ACTION':
      updateParagraphAction(draft, action.payload)
      break
    case 'PUSH_BLOCK_ELEMENT_ACTION':
      pushBlockElementAction(draft, action.payload, elements)
      break
    case 'UPDATE_ACTIVE_TOOLTIP_ACTION':
      updateActiveTooltipAction(draft, action.payload)
      break
    case 'UPDATE_ACTIVE_ELEMENT_ID_ACTION':
      updateActiveElementIdAction(draft, action.payload)
      break
    case 'UPDATE_PREV_SELECTION_END_ACTION':
      updatePrevSelectionEndAction(draft, action.payload)
      break
    default:
      throw Error('Unknown action')
  }
}
