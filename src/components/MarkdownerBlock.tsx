import { memo } from 'react'
import { Block } from '../types'
import { ParagraphInput, HeadingInput } from '../blocks'

export const MarkdownerBlock = memo(function MarkdownerBlock({
  block,
}: {
  block: Block
}) {
  switch (block.type) {
    case 'paragraph':
      return <ParagraphInput value={block} />

    case 'heading':
      return <HeadingInput value={block} />

    default:
      return null
  }
})
