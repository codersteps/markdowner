import {
  ListInput,
  CodeInput,
  PictureInput,
  HeadingInput,
  ParagraphInput,
} from '@/blocks'
import { memo } from 'react'
import { Block } from '@/types'

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

    case 'list':
      return <ListInput value={block} />

    case 'picture':
      return <PictureInput value={block} />

    case 'paragraph':
      return <ParagraphInput value={block} />

    default:
      return null
  }
})
