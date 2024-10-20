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

// export function indentMultipleLine(
//   text: string,
//   selection: { selectionEnd: number; selectionStart: number },
// ) {}

// export function unindentMultipleLine(
//   text: string,
//   selection: { selectionEnd: number; selectionStart: number },
// ) {}
