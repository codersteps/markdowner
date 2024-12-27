import { cn } from '@/lib'
import { useState } from 'react'
import { uniqueId } from '@/core'
import { AddBlock } from '@/types'
import { ToolbarButton } from '@/components'

type Props = { dispatch(action: AddBlock): void }

export default function ListAction({ dispatch }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mdr-relative">
      <ToolbarButton
        title="Insert New List"
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
        className={cn(
          'mdr-text-sm mdr-font-bold',
          isOpen ? 'mdr-text-black' : '',
        )}
      >
        L
      </ToolbarButton>

      <div
        className="mdr-absolute mdr-left-0 mdr-right-0 mdr-top-full mdr-space-y-1 mdr-mt-1 mdr-z-50 mdr-bg-white mdr-rounded"
        style={{
          display: isOpen ? '' : 'none',
        }}
      >
        <ToolbarButton
          title="Insert New UL List"
          onClick={() => {
            setIsOpen(false)
            dispatch({
              type: 'ADD_BLOCK',
              payload: {
                block: {
                  id: uniqueId(),
                  type: 'list',
                  content: {
                    type: 'unordered',
                    items: [{ id: uniqueId(), text: '' }],
                  },
                },
              },
            })
          }}
          className="mdr-text-sm mdr-font-bold"
        >
          UL
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
                  type: 'list',
                  content: {
                    type: 'ordered',
                    items: [{ id: uniqueId(), text: '' }],
                  },
                },
              },
            })
          }}
          className="mdr-text-sm mdr-font-bold"
        >
          OL
        </ToolbarButton>
      </div>
    </div>
  )
}
