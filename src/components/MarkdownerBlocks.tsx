import { cn } from '../lib'
import { ToolbarButton } from '.'
import {
  TrashIcon,
  XMarkIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/20/solid'
import { ParagraphInput } from '../blocks'
import { MarkdownerContext } from '../contexts'
import { useCallback, useContext } from 'react'
import { Block, MarkdownerElement } from '../types'

export function MarkdownerBlocks() {
  const { state, dispatch } = useContext(MarkdownerContext)
  const onKey = useCallback(
    (key: string, block: Block) => {
      dispatch({
        type: 'HANDLE_KEY_ACTION',
        payload: { key, block },
      })
    },
    [dispatch],
  )

  const onMounted = useCallback(
    (pos: number, element: MarkdownerElement) => {
      dispatch({
        type: 'PUSH_BLOCK_ELEMENT_ACTION',
        payload: { pos, element },
      })
    },
    [dispatch],
  )

  return (
    <div className="bg-white pb-32 space-y-3 rounded-md">
      {state.blocks.map((block) => (
        <div key={block.pos}>
          <div className="flex items-stretch space-x-4">
            <div
              className={cn(
                'relative w-10',
                state.activeTooltip?.pos === block.pos ? 'h-10' : '',
              )}
            >
              <div
                className={cn(
                  state.activeTooltip?.pos === block.pos
                    ? 'absolute top-0 z-10 bg-white rounded'
                    : '',
                )}
              >
                <ToolbarButton
                  onClick={() => {
                    if (state.activeTooltip?.pos === block.pos) {
                      dispatch({
                        type: 'UPDATE_ACTIVE_TOOLTIP_ACTION',
                        payload: { activeTooltip: null },
                      })
                    } else {
                      dispatch({
                        type: 'UPDATE_ACTIVE_TOOLTIP_ACTION',
                        payload: { activeTooltip: block },
                      })
                    }
                  }}
                >
                  {state.activeTooltip?.pos === block.pos ? (
                    <XMarkIcon className="h-4" />
                  ) : block.type === 'heading' ? (
                    <span className="font-medium text-xs">H{block.level}</span>
                  ) : (
                    <EllipsisVerticalIcon className="h-4" />
                  )}
                </ToolbarButton>

                <div
                  className={cn(
                    state.activeTooltip?.pos === block.pos
                      ? 'flex flex-col items-center space-y-1 mt-1'
                      : 'hidden',
                  )}
                >
                  {block.pos > 0 && (
                    <ToolbarButton
                      onClick={() => {
                        dispatch({
                          type: 'MOVE_BLOCK_UP_ACTION',
                          payload: { block },
                        })
                      }}
                    >
                      <ArrowUpIcon className="h-4" />
                    </ToolbarButton>
                  )}
                  {block.pos < state.blocks.length - 1 && (
                    <ToolbarButton
                      onClick={() => {
                        dispatch({
                          type: 'MOVE_BLOCK_DOWN_ACTION',
                          payload: { block },
                        })
                      }}
                    >
                      <ArrowDownIcon className="h-4" />
                    </ToolbarButton>
                  )}
                  <ToolbarButton
                    onClick={() => {
                      dispatch({
                        type: 'DELETE_BLOCK_ACTION',
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
              {block.type === 'paragraph' ? (
                <ParagraphInput
                  onKey={onKey}
                  onMounted={onMounted}
                  value={block}
                />
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
