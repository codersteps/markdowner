import { cn } from '@/lib'
import { ReactNode } from 'react'
import { useList } from './list.hook'
import { ListContent } from '@/types'

type Props = {
  itemId: string
  itemType: ListContent['type']
  children: ReactNode
  className?: string
}

export function ListTypeButton({
  itemId,
  itemType,
  children,
  className,
}: Props) {
  const { toggleItemType } = useList()

  return (
    <button
      title="Toggle list type"
      className={cn(
        'min-w-6 text-base text-center leading-[22px] font-semibold transition-colors duration-300 text-plumbeous hover:text-black hover:shadow bg-white border border-mercury rounded',
        className,
      )}
      onClick={toggleItemType}
      data-item-id={itemId}
      data-item-type={itemType}
    >
      {children}
    </button>
  )
}
