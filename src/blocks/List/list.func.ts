import { uniqueId } from '@/core'
import { List, ListItem } from '@/types'

export const activateListItemElement = (id: string) => {
  setTimeout(() => {
    const element = document.getElementById(id)
    element?.focus()
  })
}

export const getListItemMeta = (items: ListItem[], path: string) => {
  let idx = -1
  let item: ListItem | undefined
  let parent: ListItem | undefined
  let isParent = false
  const lastItemId = path.split('/').slice(-1).pop()

  for (const itemId of path.split('/')) {
    const foundItem = items.find(({ id }, i) => {
      if (id === itemId) {
        idx = i
        return true
      }
      return false
    })

    if (!foundItem) {
      throw `List item with id: ${itemId} was not found!`
    }

    item = foundItem
    if (foundItem.subItems) {
      items = foundItem.subItems.items
      if (itemId === lastItemId) {
        isParent = true
      }
    }

    if (itemId !== lastItemId) {
      parent = foundItem
    }
  }

  return { idx, item: item as ListItem, parent: parent as ListItem, isParent }
}

export const addListItem = (draftBlock: List, path: string) => {
  const newItem = { id: uniqueId(), text: '' }
  const { idx, item, parent, isParent } = getListItemMeta(
    draftBlock.content.items,
    path,
  )

  if (isParent) {
    item.subItems?.items.splice(0, 0, newItem)
    activateListItemElement(newItem.id)
    return
  }

  parent.subItems?.items.splice(idx + 1, 0, newItem)
  activateListItemElement(newItem.id)
}
