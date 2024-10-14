import { Block } from '../types'
import { MarkdownerToolbar, MarkdownerBlocks } from '.'
import { MarkdownerProvider, uniqueId } from '../core'

export type MarkdownerProps = {
  initialBlocks?: Block[]
}

export function Markdowner({
  initialBlocks = [
    {
      id: uniqueId(),
      text: '',
      type: 'paragraph',
      html: '',
    },
  ],
}: MarkdownerProps) {
  return (
    <MarkdownerProvider value={initialBlocks}>
      <div className="relative flex flex-col space-y-6">
        <MarkdownerToolbar />
        <MarkdownerBlocks />
      </div>
    </MarkdownerProvider>
  )
}
