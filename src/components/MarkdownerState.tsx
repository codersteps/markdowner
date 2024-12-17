import { MarkdownerProps } from '@/types'
import { MarkdownerContext } from '@/core'
import { useContext, useEffect } from 'react'

export function MarkdownerState({
  setBlocks,
}: {
  setBlocks: MarkdownerProps['setBlocks']
}) {
  const { state } = useContext(MarkdownerContext)
  useEffect(() => {
    setBlocks(state.blocks)
  }, [state.blocks])
  return <></>
}
