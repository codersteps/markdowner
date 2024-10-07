import autosize from 'autosize'
import { Paragraph } from '../types'
import { MarkdownerContext } from '../contexts'
import { useRef, useEffect, useContext } from 'react'

type Props = {
  value: Paragraph
  onKey(key: string, block: Paragraph): void
  onMounted(id: string, target: HTMLTextAreaElement): void
  charactersPerRow?: number
}

export function ParagraphInput({
  value,
  onKey,
  onMounted,
  charactersPerRow = 81,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const { dispatch } = useContext(MarkdownerContext)

  useEffect(() => {
    autosize(ref.current as HTMLTextAreaElement)
  }, [])

  useEffect(() => {
    onMounted(value.id, ref.current as HTMLTextAreaElement)
  }, [value.id, onMounted])

  return (
    <textarea
      ref={ref}
      rows={Math.ceil(value.text.length / charactersPerRow)}
      value={value.text}
      onChange={(e) =>
        dispatch({
          type: 'UPDATE_PARAGRAPH_ACTION',
          payload: { block: { ...value, text: e.currentTarget.value } },
        })
      }
      onKeyUp={(e) => {
        onKey(e.key, value)
      }}
      onKeyDown={(e) => {
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowDown':
          case 'ArrowRight':
          case 'ArrowLeft':
            dispatch({
              type: 'UPDATE_PREV_SELECTION_END_ACTION',
              payload: { prevSelectionEnd: e.currentTarget.selectionEnd },
            })
            break
          case 'Enter':
            e.preventDefault()
            dispatch({
              type: 'CREATE_PARAGRAPH_ACTION',
            })
            break
        }
      }}
      onFocus={() => {
        dispatch({
          type: 'UPDATE_ACTIVE_ELEMENT_ID_ACTION',
          payload: { activeElementId: value.id },
        })
      }}
      placeholder="Paragraph"
      autoComplete="off"
      className="block w-full pb-3 bg-transparent placeholder:text-plumbeous resize-none focus:outline-none"
    />
  )
}
