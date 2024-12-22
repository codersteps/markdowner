import { cn } from '@/lib'
import { memo } from 'react'
import { useList } from './list.hook'
import { AutosizeTextarea } from '@/components'
import { List, MarkdownerAction } from '@/types'
import { ListTypeButton } from './ListTypeButton'
import { OrderedListItem } from './OrderedListItem'

type Props = {
  items: List['content']['items']
  block: List
  isChild: boolean
  listTree: string[]
  dispatch(action: MarkdownerAction): void
  activeBlockId: string | null
}

export const UnorderedListItem = memo(function UnorderedListItem({
  items,
  block,
  isChild,
  listTree,
  dispatch,
  activeBlockId,
}: Props) {
  const {
    handleBlur,
    handleFocus,
    handleKeyDown,
    toggleItemType,
    handleOnItemChange,
  } = useList({ block, dispatch, listTree, activeBlockId })

  return (
    <ul className={cn('mdr-space-y-1.5', isChild ? 'mdr-ps-5' : '')}>
      {items.map((item, idx) => (
        <li className="mdr-space-y-1" key={idx}>
          <div className="mdr-flex mdr-items-start mdr-space-x-1.5">
            <ListTypeButton
              itemId={item.id}
              itemType="unordered"
              onClick={toggleItemType}
            >
              &bull;
            </ListTypeButton>
            <AutosizeTextarea
              id={item.id}
              rows={1}
              value={item.text}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={handleOnItemChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          {item.subItems &&
            (item.subItems.type === 'unordered' ? (
              <UnorderedListItem
                items={item.subItems.items}
                block={block}
                isChild={true}
                dispatch={dispatch}
                listTree={listTree}
                activeBlockId={activeBlockId}
              />
            ) : (
              <OrderedListItem
                items={item.subItems.items}
                block={block}
                isChild={true}
                dispatch={dispatch}
                listTree={listTree}
                activeBlockId={activeBlockId}
              />
            ))}
        </li>
      ))}
    </ul>
  )
})
