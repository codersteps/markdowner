import { cn } from '@/lib'
import { memo } from 'react'
import { List } from '@/types'
import { useList } from './list.hook'
import { AutosizeTextarea } from '@/components'
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
      {items.map((item, idx) => (
        <li className="space-y-1" key={idx}>
          <div className="flex space-x-1">
            <div className="font-semibold">
              <span className="text-sm leading-6">{idx + 1}</span>.{' '}
            </div>
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
