import { uniqueId } from '@/core'
import { List, ListItem, MarkdownerElement } from '@/types'

const activateListItemElement = (
  id: string,
  selection?: {
    selectionStart: number
    selectionEnd: number
  },
) => {
  setTimeout(() => {
    const element = document.getElementById(id) as MarkdownerElement
    element.setSelectionRange(
      selection ? selection.selectionStart : element.value.length,
      selection ? selection.selectionEnd : element.value.length,
    )
    element.focus()
  })
}

const getListItemMeta = (items: ListItem[], path: string) => {
  let idx = -1
  let item: ListItem = { id: '', text: '' }
  let isParent = false
  const parents: ListItem[] = []
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
      parents.push(foundItem)
    }
  }

  return { idx, item, parents, isParent }
}

export const addListItem = (draftBlock: List, path: string) => {
  const newItem = { id: uniqueId(), text: '' }
  const { idx, item, parents, isParent } = getListItemMeta(
    draftBlock.content.items,
    path,
  )

  if (isParent) {
    item.subItems?.items.splice(0, 0, newItem)
    activateListItemElement(newItem.id)
    return
  }

  for (const parent of parents.slice(-1)) {
    parent.subItems?.items.splice(idx + 1, 0, newItem)
    activateListItemElement(newItem.id)
  }
}

export const nestListItem = (
  draftBlock: List,
  path: string,
  withShift: boolean,
) => {
  const { idx, item, parents } = getListItemMeta(draftBlock.content.items, path)
  const { selectionStart, selectionEnd } = document.getElementById(
    item.id,
  ) as MarkdownerElement

  for (const parent of parents.slice(-1)) {
    if (withShift) {
      for (const grandParent of parents.slice(-2, -1)) {
        if (grandParent.subItems) {
          for (let i = 0; i < grandParent.subItems.items.length; i++) {
            if (grandParent.subItems.items[i].id === parent.id) {
              parent.subItems?.items.splice(idx, 1)
              grandParent.subItems.items.splice(i + 1, 0, item)
              activateListItemElement(item.id, { selectionStart, selectionEnd })
              break
            }
          }
        }
      }
    } else if (parent.subItems) {
      const prevItem = parent.subItems.items[idx - 1]
      if (prevItem) {
        parent.subItems.items.splice(idx, 1)
        if (prevItem.subItems) {
          prevItem.subItems.items.push(item)
        } else {
          prevItem.subItems = {
            type: parent.subItems.type,
            items: [item],
          }
        }
        activateListItemElement(item.id, { selectionStart, selectionEnd })
      }
    }
  }
}
