import { memo } from 'react'
import { useMarkdowner } from '@/core'
import { AutosizeTextarea } from '@/components'
import { MarkdownerAction, Paragraph } from '@/types'

type Props = {
  value: Paragraph
  dispatch(action: MarkdownerAction): void
  charactersPerRow?: number
}

export const ParagraphInput = memo(function ParagraphInput({
  value,
  dispatch,
  charactersPerRow = 81,
}: Props) {
  const { ref, handleBlur, handleFocus, handleKeyDown } = useMarkdowner(
    value,
    dispatch,
  )

  return (
    <AutosizeTextarea
      id={value.id}
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
      className="mdr-block mdr-w-full mdr-pb-3 mdr-bg-transparent placeholder:mdr-text-plumbeous mdr-resize-none focus:mdr-outline-none"
    />
  )
})
