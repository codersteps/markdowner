import { TAB_SPACES } from '@/core'

export function uniqueId() {
  return (Math.random() + 1).toString(36).substring(7)
}

export function indentSingleLine(text: string, cursor: number) {
  const tabLeftText = text.substring(0, cursor)
  const tabRightText = text.substring(cursor)

  cursor += TAB_SPACES.length

  return { text: tabLeftText + TAB_SPACES + tabRightText, cursor }
}

export function unindentSingleLine(text: string, cursor: number) {
  let tabLeftText = text.substring(0, cursor)
  let tabRightText = text.substring(cursor)

  if (tabRightText.startsWith(TAB_SPACES)) {
    tabRightText = tabRightText.substring(TAB_SPACES.length)
    cursor -= TAB_SPACES.length
  } else if (tabLeftText.endsWith(TAB_SPACES)) {
    tabLeftText = tabLeftText.substring(
      0,
      tabLeftText.length - TAB_SPACES.length,
    )
    cursor -= TAB_SPACES.length
  }

  return { text: tabLeftText + tabRightText, cursor }
}

export function indentMultipleLine(
  text: string,
  selectionStart: number,
  selectionEnd: number,
) {
  const textRows = text.split('\n')
  const startRowIndex = Math.max(
    text.substring(0, selectionStart).split('\n').length - 1,
  )
  const endRowIndex = Math.max(
    text.substring(0, selectionEnd).split('\n').length - 1,
  )
  const selectedTextRows = text
    .substring(selectionStart, selectionEnd)
    .split('\n')
    .map((row, i) => {
      const textRowsIndex = i + startRowIndex
      return [startRowIndex, endRowIndex].includes(textRowsIndex)
        ? textRows[textRowsIndex]
        : row
    })
  const indentedSelectedTextRows = selectedTextRows.map((row) => {
    return TAB_SPACES + row
  })
  for (let i = 0; i < indentedSelectedTextRows.length; i++) {
    const textRowsIndex = i + startRowIndex
    textRows[textRowsIndex] = indentedSelectedTextRows[i]
  }

  return {
    text: textRows.join('\n'),
    selectionStart: selectionStart + TAB_SPACES.length,
    selectionEnd: selectionEnd + TAB_SPACES.length * 2,
  }
}

export function unindentMultipleLine(
  text: string,
  selectionStart: number,
  selectionEnd: number,
) {
  return { text, selectionStart, selectionEnd }
}
