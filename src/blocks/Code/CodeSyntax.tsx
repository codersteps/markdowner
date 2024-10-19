import { Lang } from '../../types'
import { useEffect, useRef, useState } from 'react'
import { cn, CreateShiki, createShiki } from '../../lib'

type Props = {
  value: { text: string; lang: Lang }
  height: string
}

export function CodeSyntax({ value, height }: Props) {
  const [syntax, setSyntax] = useState('')
  const [preClassName, setPreClassName] = useState('')
  const codeToHtmlRef = useRef<CreateShiki['codeToHtml']>()

  useEffect(() => {
    createShiki().then(({ codeToHtml }) => {
      codeToHtmlRef.current = codeToHtml
    })
  }, [])

  useEffect(() => {
    if (codeToHtmlRef.current) {
      const div = document.createElement('div')
      div.innerHTML = codeToHtmlRef.current(value)
      const preElement = div.querySelector('pre') as HTMLPreElement
      setSyntax(preElement.innerHTML)
      setPreClassName(preElement.className)
    }
  }, [value, codeToHtmlRef])

  return (
    <pre
      style={{ height: height || 'auto' }}
      className={cn('code-syntax', preClassName)}
      dangerouslySetInnerHTML={{ __html: syntax }}
    ></pre>
  )
}
