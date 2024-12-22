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
        'mdr-min-w-6 mdr-text-base mdr-text-center mdr-leading-[22px] mdr-font-semibold mdr-transition-colors mdr-duration-300 mdr-text-plumbeous mdr-hover:text-black mdr-hover:shadow mdr-bg-white mdr-border mdr-border-mercury mdr-rounded',
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
