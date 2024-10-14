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

export type MountedFunction<E> = (id: string, element: E) => void

export type MarkdownerElement = HTMLTextAreaElement
export type MarkdownerElements = Map<string, MarkdownerElement>

export type MarkdownerState = {
  blocks: Block[]
  activeTooltip: Block | null
  activeBlock: Block | null
  lastActiveBlock: Block | null
  lastSelection: { selectionStart: number; selectionEnd: number } | null
}
