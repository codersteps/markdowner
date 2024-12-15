import { uniqueId } from '@/core'
import { List, ListContent, ListItem, MarkdownerElement } from '@/types'

const activateListItemElement = (
  id: string,
  selection?: {
    selectionStart: number
    selectionEnd: number
  },
) => {
  setTimeout(() => {
    const element = document.getElementById(id) as MarkdownerElement
    if (element) {
      element.setSelectionRange(
        selection ? selection.selectionStart : element.value.length,
        selection ? selection.selectionEnd : element.value.length,
      )
      element.focus()
    }
  })
}

const getListItemMeta = (draftBlock: List, path: string) => {
  let idx = -1
  let item: ListItem = { id: '', text: '' }
  let items = draftBlock.content.items
  let isLast = false
  let isParent = false
  let rootItemIdx = -1
  const parents: ListItem[] = []
  const lastItemId = path.split('/').slice(-1).pop()

  for (const itemId of path.split('/')) {
    const foundItem = items.find(({ id }, i) => {
      if (id === itemId) {
        idx = i
        isLast = i === items.length - 1
        if (rootItemIdx === -1) {
          rootItemIdx = i
        }
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

  return {
    idx,
    item,
    parents,
    isLast,
    isParent,
    nestFromRoot() {
      const { selectionStart, selectionEnd } = document.getElementById(
        item.id,
      ) as MarkdownerElement
      const prevItem = draftBlock.content.items[rootItemIdx - 1]
      if (prevItem) {
        draftBlock.content.items.splice(idx, 1)
        if (prevItem.subItems) {
          prevItem.subItems.items.push(item)
        } else {
          prevItem.subItems = {
            type: draftBlock.content.type,
            items: [item],
          }
        }
        activateListItemElement(item.id, { selectionStart, selectionEnd })
      }
    },
    insertInRoot(
      newItem?: ListItem,
      selection?: { selectionStart: number; selectionEnd: number },
    ) {
      if (newItem) {
        draftBlock.content.items.splice(rootItemIdx + 1, 0, newItem)
        activateListItemElement(newItem.id, selection)
      } else if (parents[0] && parents[0].subItems) {
        parents[0].subItems.items.splice(idx, 1)
        draftBlock.content.items.splice(rootItemIdx + 1, 0, item)
        activateListItemElement(item.id, selection)
      }
    },
    removeFromRoot() {
      draftBlock.content.items.splice(idx, 1)
    },
    updateRootType(type: ListContent['type']) {
      draftBlock.content.type = type
    },
  }
}

export const addListItem = (draftBlock: List, path: string): boolean => {
  const newItem = { id: uniqueId(), text: '' }
  const { idx, item, parents, isLast, isParent, insertInRoot, removeFromRoot } =
    getListItemMeta(draftBlock, path)
  const [parent] = parents.slice(-1)

  if (isLast && item.text.trim() === '') {
    if (parent) {
      unnestListItem(draftBlock, path)
      return true
    }

    removeFromRoot()
    return false
  }

  if (isParent && item.subItems) {
    item.subItems.items.splice(0, 0, newItem)
    activateListItemElement(newItem.id)
    return true
  }

  if (parent) {
    parent.subItems?.items.splice(idx + 1, 0, newItem)
    activateListItemElement(newItem.id)
    return true
  }

  insertInRoot(newItem)
  return true
}

export const nestListItem = (draftBlock: List, path: string) => {
  const { idx, item, parents, nestFromRoot } = getListItemMeta(draftBlock, path)
  const { selectionStart, selectionEnd } = document.getElementById(
    item.id,
  ) as MarkdownerElement

  const [parent] = parents.slice(-1)
  if (parent && parent.subItems) {
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
  } else {
    nestFromRoot()
  }
}

export const unnestListItem = (draftBlock: List, path: string) => {
  const { idx, item, parents, insertInRoot } = getListItemMeta(draftBlock, path)
  const { selectionStart, selectionEnd } = document.getElementById(
    item.id,
  ) as MarkdownerElement
  for (const parent of parents.slice(-1)) {
    let unnested = false
    for (const grandParent of parents.slice(-2, -1)) {
      if (grandParent.subItems) {
        for (let i = 0; i < grandParent.subItems.items.length; i++) {
          if (grandParent.subItems.items[i].id === parent.id) {
            unnested = true
            parent.subItems?.items.splice(idx, 1)
            grandParent.subItems.items.splice(i + 1, 0, item)
            activateListItemElement(item.id, { selectionStart, selectionEnd })
            break
          }
        }
      }
    }

    if (!unnested) {
      insertInRoot(undefined, { selectionStart, selectionEnd })
    }
  }
}

export const updateListItemType = (
  draftBlock: List,
  path: string,
  type: ListContent['type'],
) => {
  const { item, parents, updateRootType } = getListItemMeta(draftBlock, path)

  const [parent] = parents.slice(-1)
  if (parent && parent.subItems) {
    parent.subItems.type = type
  } else {
    updateRootType(type)
  }

  activateListItemElement(item.id)
}
