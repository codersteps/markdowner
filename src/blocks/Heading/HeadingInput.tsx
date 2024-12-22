import { memo } from 'react'
import { useMarkdowner } from '@/core'
import { Heading, Level, MarkdownerAction } from '@/types'

type Props = {
  value: Heading
  dispatch(action: MarkdownerAction): void
}

export const HeadingInput = memo(function HeadingInput({
  value,
  dispatch,
}: Props) {
  const { ref, handleBlur, handleFocus, handleKeyDown } = useMarkdowner(
    value,
    dispatch,
  )

  return (
    <input
      id={value.id}
      ref={ref}
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
      placeholder={
        {
          [Level.H2]: 'Heading',
          [Level.H3]: 'Sub Heading',
          [Level.H4]: 'Sub Sub Headind',
          [Level.H5]: 'Sub Sub Headind',
          [Level.H6]: 'Sub Sub Headind',
        }[value.level]
      }
      autoComplete="off"
      className="mdr-w-full mdr-pb-3 mdr-bg-transparent mdr-font-bold mdr-resize-none mdr-focus:outline-none"
    />
  )
})
