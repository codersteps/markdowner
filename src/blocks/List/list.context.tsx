import { List } from '@/types'
import { createContext } from 'react'

export const ListContext = createContext<{
  block?: List
  listTree: string[]
}>({ block: undefined, listTree: [] })
