import { cn } from '@/lib'
import { ToolbarButton } from '@/components'
import { useContext, useState } from 'react'
import { MarkdownerContext, uniqueId } from '@/core'

export default function ListAction() {
  const [isOpen, setIsOpen] = useState(false)
  const { dispatch } = useContext(MarkdownerContext)

  return (
    <div className="relative">
      <ToolbarButton
        title="Insert New List"
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
        className={cn('text-sm font-bold', isOpen ? 'text-black' : '')}
      >
        L
      </ToolbarButton>

      <div
        className="absolute left-0 right-0 top-full space-y-1 mt-1 z-50 bg-white rounded"
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
                  html: '',
                  content: {
                    type: 'unordered',
                    items: [{ text: '' }],
                  },
                },
              },
            })
          }}
          className="text-sm font-bold"
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
                  html: '',
                  content: {
                    type: 'ordered',
                    items: [{ text: '' }],
                  },
                },
              },
            })
          }}
          className="text-sm font-bold"
        >
          OL
        </ToolbarButton>
      </div>
    </div>
  )
}
