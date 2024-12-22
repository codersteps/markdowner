import { cn } from '../lib'
import { ToolbarButton } from '@/components'
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
    <div className="mdr-bg-white mdr-pb-32 mdr-space-y-3 mdr-rounded-md">
      {state.blocks.map((block, idx) => (
        <div key={block.id}>
          <div className="mdr-flex mdr-items-stretch mdr-space-x-4">
            <div
              className={cn(
                'mdr-relative mdr-w-10',
                state.activeTooltipBlockId === block.id ? 'mdr-h-10' : '',
              )}
            >
              <div
                className={cn(
                  state.activeTooltipBlockId === block.id
                    ? 'mdr-absolute mdr-top-0 mdr-z-10 mdr-bg-white mdr-rounded'
                    : '',
                )}
              >
                <ToolbarButton
                  onClick={() => {
                    dispatch({ type: 'TOGGLE_TOOLTIP', payload: { block } })
                  }}
                >
                  {state.activeTooltipBlockId === block.id ? (
                    <XMarkIcon className="mdr-h-4" />
                  ) : block.type === 'heading' ? (
                    <span className="mdr-font-medium mdr-text-xs">
                      H{block.level}
                    </span>
                  ) : (
                    <EllipsisVerticalIcon className="mdr-h-4" />
                  )}
                </ToolbarButton>

                <div
                  className={cn(
                    state.activeTooltipBlockId === block.id
                      ? 'mdr-flex mdr-flex-col mdr-items-center mdr-space-y-1 mdr-mt-1'
                      : 'mdr-hidden',
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
                      <ArrowUpIcon className="mdr-h-4" />
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
                      <ArrowDownIcon className="mdr-h-4" />
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
                    <TrashIcon className="mdr-h-4" />
                  </ToolbarButton>
                </div>
              </div>
            </div>

            <div className={cn('mdr-flex-grow', `mdr-${block.type}`)}>
              <MarkdownerBlock block={block} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
