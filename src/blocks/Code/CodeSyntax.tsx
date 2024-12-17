import { Lang } from '@/types'
import { cn, CreateShiki, createShiki } from '@/lib'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

type Props = {
  value: { text: string; lang: Lang }
  height: string
  setReady: () => void
}

export const CodeSyntax = memo(function CodeSyntax({
  value,
  height,
  setReady,
}: Props) {
  const [syntax, setSyntax] = useState('')
  const [preClassName, setPreClassName] = useState('')
  const codeToHtmlRef = useRef<CreateShiki['codeToHtml'] | null>(null)

  const codeToSyntax = useCallback(() => {
    if (codeToHtmlRef.current) {
      const div = document.createElement('div')
      div.innerHTML = codeToHtmlRef.current(value)
      const preElement = div.querySelector('pre') as HTMLPreElement
      setSyntax(preElement.innerHTML)
      setPreClassName(preElement.className)
    }
  }, [value])

  useEffect(() => {
    createShiki().then(({ codeToHtml }) => {
      codeToHtmlRef.current = codeToHtml
      codeToSyntax()
      setTimeout(() => {
        setReady()
      }, 0)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    codeToSyntax()
  }, [codeToSyntax])

  return (
    <pre
      style={{ height: height || 'auto' }}
      className={cn('code-syntax', preClassName)}
      dangerouslySetInnerHTML={{ __html: syntax }}
    ></pre>
  )
})
