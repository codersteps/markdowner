import { useContext } from 'react'
import { ToolbarButton } from '../../components'
import { MarkdownerContext, uniqueId } from '../../core'

export function CodeAction() {
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
