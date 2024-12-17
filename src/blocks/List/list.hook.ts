import {
  useCallback,
  ChangeEvent,
  FocusEventHandler,
  MouseEventHandler,
  KeyboardEventHandler,
} from 'react'
import { List, ListContent, MarkdownerAction, MarkdownerElement } from '@/types'

export function useList({
  block,
  dispatch,
  listTree,
  activeBlockId,
}: {
  block: List
  dispatch: (action: MarkdownerAction) => void
  listTree: string[]
  activeBlockId: string | null
}) {
  const setActiveBlockId = (id: string) => {
    return new Promise((res) => {
      setTimeout(() => {
        const element = document.getElementById(id) as MarkdownerElement
        element.setSelectionRange(element.selectionStart, element.selectionEnd)
        element.focus()
        res(undefined)
      })
    })
  }

  const handleBlur = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
    (e) => {
      e.preventDefault()
      dispatch({ type: 'DEACTIVATE_BLOCK', payload: {} })
    },
    [dispatch],
  )

  const handleFocus = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
    (e) => {
      e.preventDefault()
      if (block) {
        dispatch({ type: 'ACTIVATE_BLOCK', payload: { block } })
      }
    },
    [block, dispatch],
  )

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>(
    (e) => {
      const id = e.currentTarget.id
      const treeIdx = listTree.findIndex((p) => p.split('/').pop() === id)
      const treeItem = listTree[treeIdx]
      const prevTreeItem = listTree[treeIdx - 1] as string | undefined
      const nextTreeItem = listTree[treeIdx + 1] as string | undefined

      dispatch({
        type: 'KEY_DOWN_LIST_ITEM',
        payload: {
          id,
          key: e.key,
          path: treeItem,
          prevPath: prevTreeItem,
          nextPath: nextTreeItem,
          withShift: e.shiftKey,
          preventDefault: () => e.preventDefault(),
        },
      })
    },
    [dispatch, listTree],
  )

  const handleOnItemChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (!block || !activeBlockId || activeBlockId !== block.id) {
        return
      }

      const id = e.currentTarget.id
      const value = e.currentTarget.value
      const treeItem = listTree.find((p) => p.split('/').pop() === id)

      if (treeItem) {
        dispatch({
          type: 'UPDATE_LIST_ITEM',
          payload: { path: treeItem, value },
        })
      }
    },
    [dispatch, block, listTree, activeBlockId],
  )

  const toggleItemType = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.preventDefault()
      const id = e.currentTarget.dataset.itemId as string
      const type = e.currentTarget.dataset.itemType as ListContent['type']

      setActiveBlockId(id).then(() => {
        const treeIdx = listTree.findIndex((p) => p.split('/').pop() === id)
        const treeItem = listTree[treeIdx]

        dispatch({
          type: 'UPDATE_LIST_ITEM_TYPE',
          payload: {
            path: treeItem,
            type: type === 'ordered' ? 'unordered' : 'ordered',
          },
        })
      })
    },
    [dispatch, listTree],
  )

  return {
    handleBlur,
    handleFocus,
    handleKeyDown,
    toggleItemType,
    handleOnItemChange,
  }
}
