import { MarkdownerProps } from '@/types'
import { MarkdownerProvider } from '@/core'
import { MarkdownerToolbar, MarkdownerBlocks } from '@/components'

export function Markdowner({ onUpload, initialBlocks = [] }: MarkdownerProps) {
  return (
    <MarkdownerProvider value={{ initialBlocks, onUpload }}>
      <div className="relative flex flex-col space-y-6">
        <MarkdownerToolbar />
        <MarkdownerBlocks />
      </div>
    </MarkdownerProvider>
  )
}
