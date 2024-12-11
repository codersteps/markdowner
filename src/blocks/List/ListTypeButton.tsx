import { cn } from '@/lib'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export function ListTypeButton({ children, className }: Props) {
  return (
    <button
      title="Toggle List Type"
      className={cn(
        'leading-6 font-semibold px-1.5 transition-colors duration-300 text-plumbeous hover:text-black hover:shadow bg-white border border-mercury rounded',
        className,
      )}
    >
      {children}
    </button>
  )
}
