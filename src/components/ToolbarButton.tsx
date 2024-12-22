import { cn } from '../lib'
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
        'mdr-flex mdr-items-center mdr-justify-center mdr-w-10 mdr-h-10 mdr-transition-colors mdr-duration-300 mdr-text-plumbeous mdr-hover:text-black mdr-bg-white mdr-border mdr-border-mercury mdr-rounded',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
