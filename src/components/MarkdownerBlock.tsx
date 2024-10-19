import { memo } from 'react'
import { Block } from '../types'
import { ParagraphInput, HeadingInput, CodeInput } from '../blocks'

export const MarkdownerBlock = memo(function MarkdownerBlock({
  block,
}: {
  block: Block
}) {
  console.log(block.type)
  switch (block.type) {
    case 'code':
      return <CodeInput value={block} />

    case 'paragraph':
      return <ParagraphInput value={block} />

    case 'heading':
      return <HeadingInput value={block} />

    default:
      return null
  }
})
