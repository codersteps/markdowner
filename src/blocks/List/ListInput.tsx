import { memo, useMemo } from 'react'
import { OrderedListItem } from './OrderedListItem'
import { UnorderedListItem } from './UnorderedListItem'
import { List, ListItem, MarkdownerAction } from '@/types'

type Props = {
  value: List
  dispatch(action: MarkdownerAction): void
  activeBlockId: string | null
}

export const ListInput = memo(function ListInput({
  value,
  dispatch,
  activeBlockId,
}: Props) {
  const listTree = useMemo<string[]>(
    () => generateListTree(value.content.items),
    [value.content.items],
  )

  return value.content.type === 'ordered' ? (
    <OrderedListItem
      items={value.content.items}
      block={value}
      isChild={false}
      dispatch={dispatch}
      listTree={listTree}
      activeBlockId={activeBlockId}
    />
  ) : (
    <UnorderedListItem
      items={value.content.items}
      block={value}
      listTree={listTree}
      isChild={false}
      dispatch={dispatch}
      activeBlockId={activeBlockId}
    />
  )
})

const generateListTree = (items: ListItem[], currentPath = ''): string[] => {
  const listTree: string[] = []

  for (const item of items) {
    const newPath = currentPath ? `${currentPath}/${item.id}` : item.id
    listTree.push(newPath)

    if (item.subItems?.items) {
      listTree.push(...generateListTree(item.subItems.items, newPath))
    }
  }

  return listTree
}
