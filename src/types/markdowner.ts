import {
  DeleteBlockAction,
  MoveBlockUpAction,
  MoveBlockDownAction,
  CreateParagraphAction,
  UpdateParagraphAction,
  PushBlockElementAction,
  UpdateActiveTooltipAction,
  UpdateActivePositionAction,
} from '../actions'

export enum Level {
  H2 = 2,
  H3 = 3,
  H4 = 4,
  H5 = 5,
  H6 = 6,
}

export interface Heading {
  pos: number
  type: 'heading'
  level: Level
  text: string
}

export type Paragraph = {
  pos: number
  type: 'paragraph'
  text: string
  html?: string
}

export type Block = Paragraph | Heading

export type MarkdownerState = {
  blocks: Block[]
  activeTooltip: Block | null
  activePosition: number | null
}

export type MarkdownerAction =
  | DeleteBlockAction
  | MoveBlockUpAction
  | MoveBlockDownAction
  | PushBlockElementAction
  | CreateParagraphAction
  | UpdateParagraphAction
  | UpdateActiveTooltipAction
  | UpdateActivePositionAction
