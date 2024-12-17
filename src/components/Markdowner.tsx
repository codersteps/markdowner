import { MarkdownerProps } from '@/types'
import { MarkdownerState } from './MarkdownerState'
import { MarkdownerProvider, uniqueId } from '@/core'
import { MarkdownerToolbar, MarkdownerBlocks } from '@/components'

export function Markdowner({
  setBlocks,
  handleUpload,
  initialBlocks = [
    {
      id: uniqueId(),
      text: '',
      type: 'paragraph',
    },
  ],
}: MarkdownerProps) {
  return (
    <MarkdownerProvider
      value={{ initialBlocks, handleUpload: handleUpload || null }}
    >
      <div className="relative flex flex-col space-y-6">
        <MarkdownerToolbar />
        <MarkdownerBlocks />
        <MarkdownerState setBlocks={setBlocks} />
      </div>
    </MarkdownerProvider>
  )
}
