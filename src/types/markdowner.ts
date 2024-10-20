import { Block } from '@/types'

export type MarkdownerState = {
  blocks: Block[]
  activeTooltipBlockId: string | null
  activeBlockId: string | null
  lastActiveBlockId: string | null
  lastSelection: { selectionStart: number; selectionEnd: number } | null
}

export type MarkdownerElement = HTMLTextAreaElement & HTMLInputElement

export type MarkdownerElements = Map<string, MarkdownerElement>
