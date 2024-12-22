import { uniqueId } from '@/core'
import { AddBlock } from '@/types'
import { ToolbarButton } from '@/components'

type Props = { dispatch(action: AddBlock): void }

export function ParagraphAction({ dispatch }: Props) {
  return (
    <ToolbarButton
      title="Insert New Paragraph"
      onClick={() => {
        dispatch({
          type: 'ADD_BLOCK',
          payload: {
            block: {
              id: uniqueId(),
              text: '',
              type: 'paragraph',
              html: '',
            },
          },
        })
      }}
      className="mdr-text-sm mdr-font-bold"
    >
      P
    </ToolbarButton>
  )
}
