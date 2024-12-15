import { cn } from '@/lib'
import { memo } from 'react'
import { List } from '@/types'
import { useList } from './list.hook'
import { AutosizeTextarea } from '@/components'
import { ListTypeButton } from './ListTypeButton'
import { OrderedListItem } from './OrderedListItem'

type Props = {
  items: List['content']['items']
  isChild: boolean
}

export const UnorderedListItem = memo(function UnorderedListItem({
  items,
  isChild,
}: Props) {
  const { handleBlur, handleFocus, handleKeyDown, handleOnItemChange } =
    useList()

  return (
    <ul className={cn('space-y-1.5', isChild ? 'ps-5' : '')}>
      {items.map((item, idx) => (
        <li className="space-y-1" key={idx}>
          <div className="flex items-start space-x-1.5">
            <ListTypeButton itemId={item.id} itemType="unordered">
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
              <UnorderedListItem items={item.subItems.items} isChild={true} />
            ) : (
              <OrderedListItem items={item.subItems.items} isChild={true} />
            ))}
        </li>
      ))}
    </ul>
  )
})
