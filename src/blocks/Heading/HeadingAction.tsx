import { cn } from '@/lib'
import { useState } from 'react'
import { uniqueId } from '@/core'
import { AddBlock, Level } from '@/types'
import { ToolbarButton } from '@/components'

type Props = { dispatch(action: AddBlock): void }

export function HeadingAction({ dispatch }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mdr-relative">
      <ToolbarButton
        title="Insert New Heading"
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
        className={cn(
          'mdr-text-sm mdr-font-bold',
          isOpen ? 'mdr-text-black' : '',
        )}
      >
        H
      </ToolbarButton>

      <div
        className="mdr-absolute mdr-left-0 mdr-right-0 mdr-top-full mdr-space-y-1 mdr-mt-1 mdr-z-20 mdr-bg-white mdr-rounded"
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
          className="mdr-text-sm mdr-font-bold"
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
          className="mdr-text-sm mdr-font-bold"
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
          className="mdr-text-sm mdr-font-bold"
        >
          H4
        </ToolbarButton>
      </div>
    </div>
  )
}
