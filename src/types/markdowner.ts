import {
  HandleKeyAction,
  DeleteBlockAction,
  MoveBlockUpAction,
  MoveBlockDownAction,
  CreateParagraphAction,
  UpdateParagraphAction,
  PushBlockElementAction,
  UpdateActiveTooltipAction,
  UpdateActiveElementIdAction,
  UpdatePrevSelectionEndAction,
} from '../actions'

export enum Level {
  H2 = 2,
  H3 = 3,
  H4 = 4,
  H5 = 5,
  H6 = 6,
}

export interface Heading {
  id: string
  type: 'heading'
  level: Level
  text: string
}

export type Paragraph = {
  id: string
  type: 'paragraph'
  text: string
  html?: string
}

export type Block = Paragraph | Heading
export type MarkdownerElement = HTMLTextAreaElement
export type MarkdownerElements = { id: string; target: MarkdownerElement }[]

export type MarkdownerState = {
  blocks: Block[]
  activeTooltip: Block | null
  activeElementId: string | null
  prevSelectionEnd: number | null
}

export type MarkdownerAction =
  | HandleKeyAction
  | DeleteBlockAction
  | MoveBlockUpAction
  | MoveBlockDownAction
  | PushBlockElementAction
  | CreateParagraphAction
  | UpdateParagraphAction
  | UpdateActiveTooltipAction
  | UpdateActiveElementIdAction
  | UpdatePrevSelectionEndAction
