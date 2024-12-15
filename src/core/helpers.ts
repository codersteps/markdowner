import { TAB_SPACES } from '@/core'

export function uniqueId() {
  return Math.random().toString(36).substring(5)
}

export function logProxies(args: { [k in string]: any }) {
  for (const arg in args) {
    console.log(
      arg + ':',
      typeof args[arg] === 'undefined'
        ? undefined
        : JSON.parse(JSON.stringify(args[arg])),
    )
  }
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

    if (i === 0) {
      selectionStart += TAB_SPACES.length
      selectionEnd += TAB_SPACES.length
    } else if (i === selectedTextRows.length - 1) {
      selectionEnd += TAB_SPACES.length
    } else {
      selectionEnd += TAB_SPACES.length
    }

    textRows[textRowsIndex] = indentedSelectedTextRows[i]
  }

  return { text: textRows.join('\n'), selectionStart, selectionEnd }
}

export function unindentMultipleLine(
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

  const unindentedSelectedTextRows = selectedTextRows.map((row, i) => {
    if (row.startsWith(TAB_SPACES)) {
      if (i === 0) {
        selectionStart -= TAB_SPACES.length
        selectionEnd -= TAB_SPACES.length
      } else if (i === selectedTextRows.length - 1) {
        selectionEnd -= TAB_SPACES.length
      } else {
        selectionEnd -= TAB_SPACES.length
      }

      return row.substring(TAB_SPACES.length)
    }

    return row
  })

  for (let i = 0; i < unindentedSelectedTextRows.length; i++) {
    const textRowsIndex = i + startRowIndex
    textRows[textRowsIndex] = unindentedSelectedTextRows[i]
  }

  return { text: textRows.join('\n'), selectionStart, selectionEnd }
}
