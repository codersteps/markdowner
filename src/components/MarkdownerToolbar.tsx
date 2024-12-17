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
    <div className="sticky top-3 flex justify-end z-50">
      <div className="flex space-x-1.5 bg-white rounded">
        <ParagraphAction dispatch={onDispatch} />
        <HeadingAction dispatch={onDispatch} />
        <CodeAction dispatch={onDispatch} />
        <ListAction dispatch={onDispatch} />
        <PictureAction dispatch={onDispatch} />
      </div>
    </div>
  )
}
