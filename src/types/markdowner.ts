import { Block } from '@/types'
import { Dispatch } from 'react'

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
  setBlocks: Dispatch<Block[]>
  handleUpload?: UploadHandler
  staticAppUrl?: string
  initialBlocks?: Block[]
}

export type MarkdownerState = {
  blocks: Block[]
  initialElements: string[]
  handleUpload?: UploadHandler
  staticAppUrl?: string
  activeTooltipBlockId: string | null
  activeBlockId: string | null
  lastActiveBlockId: string | null
  lastSelection: { selectionStart: number; selectionEnd: number } | null
}

export type MarkdownerElement = HTMLTextAreaElement & HTMLInputElement

export type MarkdownerElements = Map<string, MarkdownerElement>
