import { Block, ListContent, MarkdownerElement } from '@/types'

export type KeyDown = {
  type: 'KEY_DOWN'
  payload: { preventDefault(): void; key: string; withShift: boolean }
}

export type AddElement = {
  type: 'ADD_ELEMENT'
  payload: { id: string; element: MarkdownerElement }
}
export type RemoveElement = {
  type: 'REMOVE_ELEMENT'
  payload: { id: string }
}

export type AddBlock = {
  type: 'ADD_BLOCK'
  payload: { block: Block }
}
export type ActivateBlock = {
  type: 'ACTIVATE_BLOCK'
  payload: { block: Block }
}
export type DeactivateBlock = {
  type: 'DEACTIVATE_BLOCK'
  payload: {}
}
export type UpdateBlock = {
  type: 'UPDATE_BLOCK'
  payload: { block: Block }
}
export type RemoveBlock = {
  type: 'REMOVE_BLOCK'
  payload: { block: Block }
}
export type MoveBlock = {
  type: 'MOVE_BLOCK'
  payload: { dir: 'up' | 'down'; block: Block }
}

export type KeyDownListItem = {
  type: 'KEY_DOWN_LIST_ITEM'
  payload: {
    id: string
    key: string
    path: string
    prevPath: string | undefined
    nextPath: string | undefined
    withShift: boolean
    preventDefault(): void
  }
}
export type UpdateListItem = {
  type: 'UPDATE_LIST_ITEM'
  payload: { path: string; value: string }
}
export type UpdateListItemType = {
  type: 'UPDATE_LIST_ITEM_TYPE'
  payload: { path: string; type: ListContent['type'] }
}

export type ToggleTooltip = {
  type: 'TOGGLE_TOOLTIP'
  payload: { block: Block }
}

export type MarkdownerAction =
  | KeyDown
  | AddElement
  | ActivateBlock
  | DeactivateBlock
  | RemoveElement
  | AddBlock
  | UpdateBlock
  | RemoveBlock
  | MoveBlock
  | KeyDownListItem
  | UpdateListItem
  | UpdateListItemType
  | ToggleTooltip
