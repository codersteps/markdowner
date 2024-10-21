import { Code } from '@/types'
import autosize from 'autosize'
import { CodeSyntax } from './CodeSyntax'
import { MarkdownerContext, useMarkdowner } from '@/core'
import { useContext, useEffect, useState, useCallback } from 'react'

type Props = {
  value: Code
}

export function CodeInput({ value }: Props) {
  const { dispatch } = useContext(MarkdownerContext)
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
    <div className="code-input" style={{ height }}>
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
      <CodeSyntax height={height} value={value} />
    </div>
  )
}
