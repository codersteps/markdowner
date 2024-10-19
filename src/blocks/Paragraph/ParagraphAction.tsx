import { useContext } from 'react'
import { ToolbarButton } from '../../components'
import { MarkdownerContext, uniqueId } from '../../core'

export function ParagraphAction() {
  const { dispatch } = useContext(MarkdownerContext)

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
      className="text-sm font-bold"
    >
      P
    </ToolbarButton>
  )
}
