import { Block } from '../types'
import { MarkdownerProvider, uniqueId } from '../core'
import { MarkdownerToolbar, MarkdownerBlocks } from './index'

export type MarkdownerProps = {
  initialBlocks?: Block[]
}

export function Markdowner({
  initialBlocks = [
    {
      id: uniqueId(),
      text: `setTimeout(() => {
  element.selectionEnd = cursor + tabSpaces.length
  element.selectionStart = cursor + tabSpaces.length
}, 0)`,
      lang: 'ts',
      type: 'code',
      filename: '',
      html: '',
    },
    {
      id: uniqueId(),
      text: `This snippet will change the selection to the next indented value.`,
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
