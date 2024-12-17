import { cn } from '@/lib'
import { ListContent } from '@/types'
import { MouseEventHandler, ReactNode } from 'react'

type Props = {
  itemId: string
  onClick: MouseEventHandler<HTMLButtonElement>
  itemType: ListContent['type']
  children: ReactNode
  className?: string
}

export function ListTypeButton({
  itemId,
  onClick,
  itemType,
  children,
  className,
}: Props) {
  return (
    <button
      title="Toggle list type"
      className={cn(
        'min-w-6 text-base text-center leading-[22px] font-semibold transition-colors duration-300 text-plumbeous hover:text-black hover:shadow bg-white border border-mercury rounded',
        className,
      )}
      onClick={onClick}
      data-item-id={itemId}
      data-item-type={itemType}
    >
      {children}
    </button>
  )
}
