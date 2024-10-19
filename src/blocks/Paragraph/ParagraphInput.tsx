import autosize from 'autosize'
import { Paragraph } from '../../types'
import { useEffect, useContext } from 'react'
import { MarkdownerContext, useMarkdowner } from '../../core'

type Props = {
  value: Paragraph
  charactersPerRow?: number
}

export function ParagraphInput({ value, charactersPerRow = 81 }: Props) {
  const { dispatch } = useContext(MarkdownerContext)
  const { ref, handleBlur, handleFocus, handleKeyDown } = useMarkdowner(value)

  useEffect(() => {
    autosize(ref.current as HTMLTextAreaElement)
  }, [ref])

  return (
    <textarea
      ref={ref}
      rows={Math.ceil(value.text.length / charactersPerRow)}
      value={value.text}
      onChange={(e) => {
        dispatch({
          type: 'UPDATE_BLOCK',
          payload: { block: { ...value, text: e.currentTarget.value } },
        })
      }}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onFocus={handleFocus}
      placeholder="Paragraph"
      autoComplete="off"
      className="block w-full pb-3 bg-transparent placeholder:text-plumbeous resize-none focus:outline-none"
    />
  )
}
