import { Block } from '@/types'

export type UploadResponse =
  | {
      alt: string | null
      path: string
      caption: string | null
    }
  | {
      error: string
    }

export type UploadHandler = (formData: FormData) => Promise<UploadResponse>

export type MarkdownerProps = {
  handleUpload?: UploadHandler | null
  initialBlocks?: Block[]
}

export type MarkdownerState = {
  blocks: Block[]
  handleUpload: UploadHandler | null
  activeTooltipBlockId: string | null
  activeBlockId: string | null
  lastActiveBlockId: string | null
  lastSelection: { selectionStart: number; selectionEnd: number } | null
}

export type MarkdownerElement = HTMLTextAreaElement & HTMLInputElement

export type MarkdownerElements = Map<string, MarkdownerElement>
