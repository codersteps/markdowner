import { cn } from '../lib/cn'
import { MouseEvent, ReactNode } from 'react'

type Props = {
  title?: string
  className?: string
  children: ReactNode
  onClick(e: MouseEvent<HTMLButtonElement>): void
}

export function ToolbarButton({ title, className, children, onClick }: Props) {
  return (
    <button
      type="button"
      title={title}
      className={cn(
        'flex items-center justify-center w-10 h-10 transition-colors duration-300 text-plumbeous hover:text-black bg-white border border-mercury rounded',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
