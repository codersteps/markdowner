import { uniqueId } from '@/core'
import { AddBlock } from '@/types'
import { ToolbarButton } from '@/components'

type Props = { dispatch(action: AddBlock): void }

export function CodeAction({ dispatch }: Props) {
  return (
    <ToolbarButton
      title="Insert New Paragraph"
      onClick={() => {
        dispatch({
          type: 'ADD_BLOCK',
          payload: {
            block: {
              id: uniqueId(),
              type: 'code',
              lang: 'ts',
              text: '',
              filename: 'Untitled.ts',
            },
          },
        })
      }}
      className="text-sm font-bold"
    >
      {'</>'}
    </ToolbarButton>
  )
}
