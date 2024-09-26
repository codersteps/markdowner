import { Block } from '../blocks'
import { Action, blocksReducer } from '../reducers'
import { createContext, Dispatch, ReactNode, useReducer } from 'react'

export const BlocksContext = createContext<Block[]>([])
export const BlocksDispatchContext = createContext<Dispatch<Action>>(() => {})

type Props = { children: ReactNode; value: Block[] }

export function BlocksProvider({ children }: Props) {
  const [blocks, dispatch] = useReducer(blocksReducer, [])

  return (
    <BlocksContext.Provider value={blocks}>
      <BlocksDispatchContext.Provider value={dispatch}>
        {children}
      </BlocksDispatchContext.Provider>
    </BlocksContext.Provider>
  )
}
