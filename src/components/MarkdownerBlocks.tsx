import { cn } from '../lib'
import { ToolbarButton } from '.'
import {
  TrashIcon,
  XMarkIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/20/solid'
import { useContext } from 'react'
import { MarkdownerContext } from '../core'
import { MarkdownerBlock } from './MarkdownerBlock'

export function MarkdownerBlocks() {
  const { state, dispatch } = useContext(MarkdownerContext)

  return (
    <div className="bg-white pb-32 space-y-3 rounded-md">
      {state.blocks.map((block, idx) => (
        <div key={block.id}>
          <div className="flex items-stretch space-x-4">
            <div
              className={cn(
                'relative w-10',
                state.activeTooltip?.id === block.id ? 'h-10' : '',
              )}
            >
              <div
                className={cn(
                  state.activeTooltip?.id === block.id
                    ? 'absolute top-0 z-10 bg-white rounded'
                    : '',
                )}
              >
                <ToolbarButton
                  onClick={() => {
                    dispatch({ type: 'TOGGLE_TOOLTIP', payload: { block } })
                  }}
                >
                  {state.activeTooltip?.id === block.id ? (
                    <XMarkIcon className="h-4" />
                  ) : block.type === 'heading' ? (
                    <span className="font-medium text-xs">H{block.level}</span>
                  ) : (
                    <EllipsisVerticalIcon className="h-4" />
                  )}
                </ToolbarButton>

                <div
                  className={cn(
                    state.activeTooltip?.id === block.id
                      ? 'flex flex-col items-center space-y-1 mt-1'
                      : 'hidden',
                  )}
                >
                  {idx > 0 && (
                    <ToolbarButton
                      onClick={() => {
                        dispatch({
                          type: 'MOVE_BLOCK',
                          payload: { block, dir: 'up' },
                        })
                      }}
                    >
                      <ArrowUpIcon className="h-4" />
                    </ToolbarButton>
                  )}
                  {idx < state.blocks.length - 1 && (
                    <ToolbarButton
                      onClick={() => {
                        dispatch({
                          type: 'MOVE_BLOCK',
                          payload: { block, dir: 'down' },
                        })
                      }}
                    >
                      <ArrowDownIcon className="h-4" />
                    </ToolbarButton>
                  )}
                  <ToolbarButton
                    onClick={() => {
                      dispatch({
                        type: 'REMOVE_BLOCK',
                        payload: { block },
                      })
                    }}
                  >
                    <TrashIcon className="h-4" />
                  </ToolbarButton>
                </div>
              </div>
            </div>

            <div className="flex-grow">
              <MarkdownerBlock block={block} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
