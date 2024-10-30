import { List } from '@/types'
import { useContext } from 'react'
import { MarkdownerContext } from '@/core'
import { OrderedListItem } from './OrderedListItem'
import { UnorderedListItem } from './UnorderedListItem'

type Props = {
  value: List
}

export function ListInput({ value }: Props) {
  const { dispatch } = useContext(MarkdownerContext)

  return (
    <>
      {value.content.type === 'ordered' ? (
        <OrderedListItem items={value.content.items} isChild={false} />
      ) : (
        <UnorderedListItem items={value.content.items} isChild={false} />
      )}
    </>
  )
}
