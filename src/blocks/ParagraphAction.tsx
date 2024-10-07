import { useContext } from 'react'
import { ToolbarButton } from '../components'
import { MarkdownerContext } from '../contexts'

export function ParagraphAction() {
  const { dispatch } = useContext(MarkdownerContext)

  return (
    <ToolbarButton
      title="Insert New Paragraph"
      onClick={() => {
        dispatch({ type: 'CREATE_PARAGRAPH_ACTION' })
      }}
      className="text-sm font-bold"
    >
      P
    </ToolbarButton>
  )
}
