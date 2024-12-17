import { cn } from '@/lib'
import { useState } from 'react'
import { uniqueId } from '@/core'
import { AddBlock, Level } from '@/types'
import { ToolbarButton } from '@/components'

type Props = { dispatch(action: AddBlock): void }

export function HeadingAction({ dispatch }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <ToolbarButton
        title="Insert New Heading"
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
        className={cn('text-sm font-bold', isOpen ? 'text-black' : '')}
      >
        H
      </ToolbarButton>

      <div
        className="absolute left-0 right-0 top-full space-y-1 mt-1 z-50 bg-white rounded"
        style={{
          display: isOpen ? '' : 'none',
        }}
      >
        <ToolbarButton
          title="Insert New H2 Heading"
          onClick={() => {
            setIsOpen(false)
            dispatch({
              type: 'ADD_BLOCK',
              payload: {
                block: {
                  id: uniqueId(),
                  type: 'heading',
                  level: Level.H2,
                  text: '',
                },
              },
            })
          }}
          className="text-sm font-bold"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          title="Insert New H3 Heading"
          onClick={() => {
            setIsOpen(false)
            dispatch({
              type: 'ADD_BLOCK',
              payload: {
                block: {
                  id: uniqueId(),
                  type: 'heading',
                  level: Level.H3,
                  text: '',
                },
              },
            })
          }}
          className="text-sm font-bold"
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          title="Insert New H4 Heading"
          onClick={() => {
            setIsOpen(false)
            dispatch({
              type: 'ADD_BLOCK',
              payload: {
                block: {
                  id: uniqueId(),
                  type: 'heading',
                  level: Level.H4,
                  text: '',
                },
              },
            })
          }}
          className="text-sm font-bold"
        >
          H4
        </ToolbarButton>
      </div>
    </div>
  )
}
