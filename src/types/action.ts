import { Block, MarkdownerElement } from '.'

export type KeyDown = {
  type: 'KEY_DOWN'
  payload: { preventDefault(): void; key: string }
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
  | ToggleTooltip
