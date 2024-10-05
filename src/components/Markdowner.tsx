import { Block } from '../types'
import { MarkdownerProvider } from '../contexts'
import { MarkdownerToolbar, MarkdownerBlocks } from '.'

export type MarkdownerProps = {
  initialBlocks?: Block[]
}

export function Markdowner({
  initialBlocks = [
    {
      pos: 0,
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
