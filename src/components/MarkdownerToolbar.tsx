import {
  CodeAction,
  HeadingAction,
  ParagraphAction,
  PictureAction,
} from '@/blocks'
import ListAction from '@/blocks/List/ListAction'
import { MarkdownerContext } from '@/core'
import { MarkdownerAction } from '@/types'
import { useCallback, useContext } from 'react'

export function MarkdownerToolbar() {
  const { dispatch } = useContext(MarkdownerContext)
  const onDispatch = useCallback((action: MarkdownerAction) => {
    dispatch(action)
  }, [])

  return (
    <div className="mdr-sticky mdr-top-3 mdr-flex mdr-justify-end mdr-z-30">
      <div className="mdr-flex mdr-space-x-1.5 mdr-bg-white mdr-rounded">
        <ParagraphAction dispatch={onDispatch} />
        <HeadingAction dispatch={onDispatch} />
        <CodeAction dispatch={onDispatch} />
        <ListAction dispatch={onDispatch} />
        <PictureAction dispatch={onDispatch} />
      </div>
    </div>
  )
}
