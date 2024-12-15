import { useContext } from 'react'
import { Heading, Level } from '@/types'
import { MarkdownerContext, useMarkdowner } from '@/core'

type Props = {
  value: Heading
}

export function HeadingInput({ value }: Props) {
  const { dispatch } = useContext(MarkdownerContext)
  const { ref, handleBlur, handleFocus, handleKeyDown } = useMarkdowner(value)

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
      className="w-full pb-3 bg-transparent font-bold resize-none focus:outline-none"
    />
  )
}
