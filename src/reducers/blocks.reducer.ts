import { Reducer } from 'react'
import { Block } from '../blocks'

type State = Block[]
export type Action = { type: 'add' | 'update' | 'remove'; block: Block }

export const blocksReducer: Reducer<State, Action> = (blocks, action) => {
  switch (action.type) {
    case 'add': {
      return [
        ...blocks,
        {
          pos: action.block.pos,
          type: action.block.type,
          text: action.block.text,
        },
      ]
    }
    case 'update': {
      return blocks.map((b) => {
        if (b.pos === action.block.pos) {
          return action.block
        } else {
          return b
        }
      })
    }
    case 'remove': {
      return blocks.filter((b) => b.pos !== action.block.pos)
    }
    default: {
      throw Error('Action inconnue : ' + action.type)
    }
  }
}
