import { Block } from '@/types'

export type UploadResponse = {
  alt: string | null
  path: string
  caption: string | null
}

export type UploadHandler = (formData: FormData) => Promise<UploadResponse>

export type MarkdownerProps = {
  onUpload: UploadHandler | null
  initialBlocks?: Block[]
}

export type MarkdownerState = {
  blocks: Block[]
  onUpload: UploadHandler | null
  activeTooltipBlockId: string | null
  activeBlockId: string | null
  lastActiveBlockId: string | null
  lastSelection: { selectionStart: number; selectionEnd: number } | null
}

export type MarkdownerElement = HTMLTextAreaElement & HTMLInputElement

export type MarkdownerElements = Map<string, MarkdownerElement>
