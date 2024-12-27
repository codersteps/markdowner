import { useMarkdowner } from '@/core'
import { highlighter, langs } from '@/lib'
import { AutosizeTextarea } from '@/components'
import { memo, useEffect, useState } from 'react'
import { Code, Lang, MarkdownerAction } from '@/types'

type Props = {
  value: Code
  dispatch(action: MarkdownerAction): void
}

export const CodeInput = memo(function CodeInput({ value, dispatch }: Props) {
  const [syntax, setSyntax] = useState('')
  const [height, setHeight] = useState<string | number>('auto')
  const { ref, handleBlur, handleFocus, handleKeyDown } = useMarkdowner(
    value,
    dispatch,
  )

  useEffect(() => {
    setSyntax(
      highlighter({
        text: value.text,
        lang: value.lang,
      }),
    )
  }, [value.text, value.lang])

  return (
    <>
      <div className="code-header">
        <input
          id={`filename-${value.id}`}
          type="text"
          placeholder="filename"
          value={value.filename}
          onChange={(e) => {
            const block = { ...value, filename: e.currentTarget.value }
            dispatch({
              type: 'UPDATE_BLOCK',
              payload: { block },
            })
          }}
        />
        <div className="select-wrapper">
          <select
            id={`lang-${value.id}`}
            value={value.lang}
            onChange={(e) => {
              const block = { ...value, lang: e.currentTarget.value as Lang }
              dispatch({
                type: 'UPDATE_BLOCK',
                payload: { block },
              })
            }}
          >
            {langs.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="code-input" style={{ height }}>
        <AutosizeTextarea
          id={`code-${value.id}`}
          ref={ref}
          value={value.text}
          spellCheck="false"
          onChange={(e) => {
            const block = { ...value, text: e.currentTarget.value }
            dispatch({
              type: 'UPDATE_BLOCK',
              payload: { block },
            })
          }}
          onBlur={handleBlur}
          onFocus={handleFocus}
          setHeight={setHeight}
          onKeyDown={handleKeyDown}
          placeholder="Code"
        />
        <pre className="hljs">
          <code dangerouslySetInnerHTML={{ __html: syntax }} />
        </pre>
      </div>
    </>
  )
})
