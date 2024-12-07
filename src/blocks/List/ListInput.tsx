import { List, ListItem } from '@/types'
import { ListContext } from './list.context'
import { OrderedListItem } from './OrderedListItem'
import { UnorderedListItem } from './UnorderedListItem'

type Props = {
  value: List
}

export function ListInput({ value }: Props) {
  return (
    <ListContext.Provider
      value={{ block: value, listTree: generateListTree(value.content.items) }}
    >
      {value.content.type === 'ordered' ? (
        <OrderedListItem items={value.content.items} isChild={false} />
      ) : (
        <UnorderedListItem items={value.content.items} isChild={false} />
      )}
    </ListContext.Provider>
  )
}

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
