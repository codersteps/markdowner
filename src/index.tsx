import './index.css'
import { Block } from './blocks'
import { BlockMap } from './components'
import { BlocksProvider } from './contexts'

export type MarkdownerProps = { initialBlocks: Block[] }

export function Markdowner({ initialBlocks }: MarkdownerProps) {
  return (
    <BlocksProvider value={initialBlocks}>
      <BlockMap />
    </BlocksProvider>
  )
}

export { getInitialValue } from './lib/generators'
