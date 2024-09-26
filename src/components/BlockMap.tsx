import { useContext } from 'react'
import { BlockMapItem } from './BlockMapItem'
import { BlocksContext, BlocksDispatchContext } from '../contexts'

export function BlockMap() {
  const blocks = useContext(BlocksContext)
  const dispatch = useContext(BlocksDispatchContext)

  return (
    <div className="w-full border border-gray-500 p-4 rounded space-y-5">
      {blocks.map((block) => (
        <BlockMapItem key={block.pos} block={block} />
      ))}

      <div className="flex items-center justify-between bg-gray-200 gap-x-4 p-3 rounded">
        <button
          className="w-1/2 border border-zinc-600 font-medium text-sm p-3 rounded-sm"
          onClick={() => {
            dispatch({
              type: 'add',
              block: {
                pos: blocks.length,
                text: '',
                type: 'paragraph',
                html: '',
              },
            })
          }}
        >
          Add new block
        </button>
        <button
          className="w-1/2 border border-zinc-600 font-medium text-sm p-3 rounded-sm"
          onClick={() => {
            dispatch({
              type: 'update',
              block: {
                pos: 0,
                text: 'updated',
                type: 'paragraph',
                html: '',
              },
            })
          }}
        >
          Update block
        </button>
        <button
          className="w-1/2 border border-sky-500 font-medium text-sm p-3 rounded-sm"
          onClick={() => {
            dispatch({
              type: 'remove',
              block: blocks[blocks.length - 1],
            })
          }}
        >
          Remove last block
        </button>
      </div>
    </div>
  )
}
