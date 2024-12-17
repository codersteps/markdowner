import {
  Block,
  UploadHandler,
  MarkdownerState,
  MarkdownerAction,
} from '@/types'
import { markdownerReducer } from '@/core'
import { useImmerReducer } from 'use-immer'
import { Dispatch, ReactNode, createContext } from 'react'

const initialState: MarkdownerState = {
  blocks: [],
  handleUpload: null,
  lastSelection: null,
  activeTooltipBlockId: null,
  activeBlockId: null,
  lastActiveBlockId: null,
}

export const MarkdownerContext = createContext<{
  state: MarkdownerState
  dispatch: Dispatch<MarkdownerAction>
}>({ state: initialState, dispatch() {} })

type Props = {
  value: { initialBlocks: Block[]; handleUpload: UploadHandler | null }
  children: ReactNode
}

export function MarkdownerProvider({ value, children }: Props) {
  const [state, dispatch] = useImmerReducer(markdownerReducer, {
    ...initialState,
    blocks: value.initialBlocks,
    handleUpload: value.handleUpload,
  })

  return (
    <MarkdownerContext.Provider value={{ state, dispatch }}>
      {children}
    </MarkdownerContext.Provider>
  )
}
