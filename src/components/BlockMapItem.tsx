import { Block } from '../blocks'
import { BlocksDispatchContext } from '../contexts'
import { FormEvent, memo, useCallback, useContext } from 'react'

type Props = { block: Block }

export const BlockMapItem = memo(function BlockMapItem({ block }: Props) {
  const dispatch = useContext(BlocksDispatchContext)

  const handleBlockUpdate = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      dispatch({
        type: 'update',
        block: {
          ...block,
          text: e.currentTarget.value,
        },
      })
    },
    [dispatch, block],
  )

  return (
    <div>
      <pre>{JSON.stringify(block)}</pre>
      <br />
      <input
        type="text"
        value={block.text}
        onInput={handleBlockUpdate}
        className="w-full border border-gray-400 p-1.5"
      />
    </div>
  )
})
