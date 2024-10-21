import { memo } from 'react'
import { Block } from '@/types'
import { ParagraphInput, HeadingInput, CodeInput, PictureInput } from '@/blocks'

export const MarkdownerBlock = memo(function MarkdownerBlock({
  block,
}: {
  block: Block
}) {
  switch (block.type) {
    case 'code':
      return <CodeInput value={block} />

    case 'heading':
      return <HeadingInput value={block} />

    case 'picture':
      return <PictureInput value={block} />

    case 'paragraph':
      return <ParagraphInput value={block} />

    default:
      return null
  }
})
