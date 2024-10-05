import autosize from 'autosize'
import { Paragraph } from '../types'
import { MarkdownerContext } from '../contexts'
import { useRef, useEffect, useContext } from 'react'

type Props = {
  value: Paragraph
  onMounted(target: HTMLTextAreaElement): void
  charactersPerRow?: number
}

export function ParagraphInput({
  value,
  onMounted,
  charactersPerRow = 81,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const { dispatch } = useContext(MarkdownerContext)

  useEffect(() => {
    const element = ref.current as HTMLTextAreaElement
    autosize(element)
    onMounted(element)
  }, [onMounted])

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
      onKeyDown={(e) => {
        switch (e.key) {
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
          type: 'UPDATE_ACTIVE_POSITION_ACTION',
          payload: { activePosition: value.pos },
        })
      }}
      placeholder="Paragraph"
      autoComplete="off"
      className="block w-full pb-3 bg-transparent placeholder:text-plumbeous resize-none focus:outline-none"
    />
  )
}
