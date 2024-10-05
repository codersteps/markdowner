import { useImmerReducer } from 'use-immer'
import { markdownerReducer } from '../reducers'
import { Dispatch, ReactNode, createContext } from 'react'
import { Block, MarkdownerAction, MarkdownerState } from '../types'

const initialState: MarkdownerState = {
  blocks: [],
  activeTooltip: null,
  activePosition: null,
}

export const MarkdownerContext = createContext<{
  state: MarkdownerState
  dispatch: Dispatch<MarkdownerAction>
}>({ state: initialState, dispatch() {} })

type Props = { value: Block[]; children: ReactNode }

export function MarkdownerProvider({ value, children }: Props) {
  const [state, dispatch] = useImmerReducer(markdownerReducer, {
    ...initialState,
    blocks: value,
  })

  return (
    <MarkdownerContext.Provider value={{ state, dispatch }}>
      {children}
    </MarkdownerContext.Provider>
  )
}
