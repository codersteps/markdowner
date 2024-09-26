import { Block } from '../blocks'

export function getInitialValue(): Block[] {
  return [
    {
      pos: 0,
      text: '',
      type: 'paragraph',
      html: '',
    },
  ]
}
