import { Block } from '.'

export type MarkdownerState = {
  blocks: Block[]
  activeTooltip: Block | null
  activeBlock: Block | null
  lastActiveBlock: Block | null
  lastSelection: { selectionStart: number; selectionEnd: number } | null
}

export type MarkdownerElement = HTMLTextAreaElement & HTMLInputElement

export type MarkdownerElements = Map<string, MarkdownerElement>
