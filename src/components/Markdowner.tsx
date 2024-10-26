import { MarkdownerProps } from '@/types'
import { MarkdownerProvider, uniqueId } from '@/core'
import { MarkdownerToolbar, MarkdownerBlocks } from '@/components'

export function Markdowner({
  onUpload,
  initialBlocks = [
    {
      id: uniqueId(),
      text: `setTimeout(() => {
  element.selectionEnd = cursor + tabSpaces.length
  element.selectionStart = cursor + tabSpaces.length
}, 0)`,
      lang: 'ts',
      type: 'code',
      filename: 'Untitled.ts',
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
    <MarkdownerProvider value={{ initialBlocks, onUpload }}>
      <div className="relative flex flex-col space-y-6">
        <MarkdownerToolbar />
        <MarkdownerBlocks />
      </div>
    </MarkdownerProvider>
  )
}
