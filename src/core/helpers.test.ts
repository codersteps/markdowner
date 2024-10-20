import { expect, describe, it } from 'vitest'
import { TAB_SPACES, indentSingleLine } from '@/core'

describe('text indentation', () => {
  it('indent single line', () => {
    const text = 'Single line text.'
    const result = indentSingleLine(text, 0)
    expect(result.text).toBe(TAB_SPACES + text)
  })
})
