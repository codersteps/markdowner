import { memo } from 'react'
import { Block } from '../types'
import { ParagraphInput } from '../blocks'

export const MarkdownerBlock = memo(function MarkdownerBlock({
  block,
}: {
  block: Block
}) {
  return (
    <>{block.type === 'paragraph' ? <ParagraphInput value={block} /> : null}</>
  )
})
