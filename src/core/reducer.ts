import { buildBlocksManager } from '.'
import { MarkdownerAction, MarkdownerElements, MarkdownerState } from '../types'

const elements: MarkdownerElements = new Map()
const blocksManager = buildBlocksManager(elements)

export function markdownerReducer(
  draft: MarkdownerState,
  action: MarkdownerAction,
) {
  const { type, payload } = action

  switch (type) {
    case 'ADD_ELEMENT':
      payload.element.focus()
      elements.set(payload.id, payload.element)
      break
    case 'REMOVE_ELEMENT':
      elements.delete(payload.id)
      break
    case 'KEY_DOWN':
      blocksManager.keyDown(draft, payload.key, payload.preventDefault)
      break
    case 'ADD_BLOCK':
      blocksManager.insert(draft, payload.block)
      break
    case 'ACTIVATE_BLOCK':
      blocksManager.activate(draft, payload.block)
      break
    case 'DEACTIVATE_BLOCK':
      draft.lastActiveBlock = draft.activeBlock
      draft.activeBlock = null
      break
    case 'UPDATE_BLOCK':
      blocksManager.update(draft, payload.block)
      break
    case 'REMOVE_BLOCK':
      blocksManager.remove(draft, payload.block)
      break
    case 'MOVE_BLOCK':
      if (payload.dir === 'up') {
        blocksManager.moveUp(draft, payload.block)
      } else {
        blocksManager.moveDown(draft, payload.block)
      }
      break
    case 'TOGGLE_TOOLTIP':
      blocksManager.toggleTooltip(draft, payload.block)
      break
  }
}
