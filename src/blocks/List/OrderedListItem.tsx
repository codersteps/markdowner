import { cn } from '@/lib'
import { memo } from 'react'
import { List } from '@/types'
import { useList } from './list.hook'
import { AutosizeTextarea } from '@/components'
import { ListTypeButton } from './ListTypeButton'
import { UnorderedListItem } from './UnorderedListItem'

type Props = {
  items: List['content']['items']
  isChild: boolean
}

export const OrderedListItem = memo(function OrderedListItem({
  items,
  isChild,
}: Props) {
  const { handleBlur, handleFocus, handleKeyDown, handleOnItemChange } =
    useList()

  return (
    <ul className={cn('space-y-1', isChild ? 'ps-5' : '')}>
      {items.map((item, idx) => {
        let className = 'text-xs leading-[22px]'
        const listNumber = idx + 1

        if (listNumber > 9 && listNumber < 100) {
          className += ' min-w-8'
        }

        if (listNumber > 99 && listNumber < 1000) {
          className += ' min-w-9'
        }

        return (
          <li className="space-y-1.5" key={idx}>
            <div className="flex items-center space-x-1.5">
              <ListTypeButton
                itemId={item.id}
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
              />
            </div>

            {item.subItems &&
              (item.subItems.type === 'unordered' ? (
                <UnorderedListItem items={item.subItems.items} isChild={true} />
              ) : (
                <OrderedListItem items={item.subItems.items} isChild={true} />
              ))}
          </li>
        )
      })}
    </ul>
  )
})
