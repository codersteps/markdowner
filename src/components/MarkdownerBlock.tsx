import {
  ListInput,
  CodeInput,
  PictureInput,
  HeadingInput,
  ParagraphInput,
} from '@/blocks'
import { MarkdownerContext } from '@/core'
import { useCallback, useContext } from 'react'
import { Block, MarkdownerAction } from '@/types'

export function MarkdownerBlock({ block }: { block: Block }) {
  const { state, dispatch } = useContext(MarkdownerContext)
  const onDispatch = useCallback((action: MarkdownerAction) => {
    dispatch(action)
  }, [])

  switch (block.type) {
    case 'code':
      return <CodeInput value={block} dispatch={onDispatch} />

    case 'heading':
      return <HeadingInput value={block} dispatch={onDispatch} />

    case 'list':
      return (
        <ListInput
          value={block}
          dispatch={onDispatch}
          activeBlockId={state.activeBlockId}
        />
      )

    case 'picture':
      return (
        <PictureInput
          value={block}
          handleUpload={state.handleUpload}
          dispatch={onDispatch}
        />
      )

    case 'paragraph':
      return <ParagraphInput value={block} dispatch={onDispatch} />

    default:
      return null
  }
}
