import autosize from 'autosize'
import { cn, langs } from '@/lib'
import { Code, Lang } from '@/types'
import { CodeSyntax } from './CodeSyntax'
import { MarkdownerContext, useMarkdowner } from '@/core'
import { useContext, useEffect, useState, useCallback } from 'react'

type Props = {
  value: Code
}

export function CodeInput({ value }: Props) {
  const { dispatch } = useContext(MarkdownerContext)
  const [ready, setReady] = useState(false)
  const [height, setHeight] = useState<string>('auto')
  const { ref, handleBlur, handleFocus, handleKeyDown } = useMarkdowner(value)

  const handleAutosizeResized = useCallback(() => {
    console.log((ref.current as HTMLTextAreaElement).style.height)

    setHeight((ref.current as HTMLTextAreaElement).style.height)
  }, [ref])

  useEffect(() => {
    const textArea = ref.current as HTMLTextAreaElement

    autosize(textArea)
    setHeight(textArea.style.height)
    textArea.addEventListener('autosize:resized', handleAutosizeResized)

    return function () {
      autosize.destroy(textArea)
      textArea.removeEventListener('autosize:resized', handleAutosizeResized)
    }
  }, [ref, handleAutosizeResized])

  return (
    <>
      <div className="code-header">
        <input
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
      <div
        className={cn('code-input', ready ? '--initialized' : '')}
        style={{ height }}
      >
        <textarea
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
          onKeyDown={handleKeyDown}
          placeholder="Code"
        ></textarea>
        <CodeSyntax
          value={value}
          height={height}
          setReady={() => setReady(true)}
        />
      </div>
    </>
  )
}
