import { cn } from '@/lib'
import { memo } from 'react'
import { useList } from './list.hook'
import { AutosizeTextarea } from '@/components'
import { List, MarkdownerAction } from '@/types'
import { ListTypeButton } from './ListTypeButton'
import { UnorderedListItem } from './UnorderedListItem'

type Props = {
  items: List['content']['items']
  block: List
  isChild: boolean
  listTree: string[]
  dispatch(action: MarkdownerAction): void
  activeBlockId: string | null
}

export const OrderedListItem = memo(function OrderedListItem({
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
  } = useList({
    block,
    dispatch,
    listTree,
    activeBlockId,
  })

  return (
    <ul className={cn('mdr-space-y-1', isChild ? 'mdr-ps-5' : '')}>
      {items.map((item, idx) => {
        let className = 'mdr-text-xs mdr-leading-[22px]'
        const listNumber = idx + 1

        if (listNumber > 9 && listNumber < 100) {
          className += ' mdr-min-w-8'
        }

        if (listNumber > 99 && listNumber < 1000) {
          className += ' mdr-min-w-9'
        }

        return (
          <li className="mdr-space-y-1.5" key={idx}>
            <div className="mdr-flex mdr-items-start mdr-space-x-1.5">
              <ListTypeButton
                itemId={item.id}
                onClick={toggleItemType}
                itemType="ordered"
                className={className}
              >
                {idx + 1}
              </ListTypeButton>
              <AutosizeTextarea
                id={item.id}
                rows={1}
                value={item.text}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleOnItemChange}
                onKeyDown={handleKeyDown}
                placeholder="List item"
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
        )
      })}
    </ul>
  )
})
