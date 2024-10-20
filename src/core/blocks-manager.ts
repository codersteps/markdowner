import {
  uniqueId,
  indentSingleLine,
  unindentSingleLine,
  // indentMultipleLine,
  // unindentMultipleLine,
} from '@/core'
import {
  Block,
  MarkdownerState,
  MarkdownerElement,
  MarkdownerElements,
} from '@/types'

export function buildBlocksManager(elements: MarkdownerElements) {
  return {
    keyDown(
      draft: MarkdownerState,
      key: string,
      withShift: boolean,
      preventDefault: () => void,
    ) {
      let element: MarkdownerElement | undefined
      let prevElement: MarkdownerElement | undefined
      let nextElement: MarkdownerElement | undefined
      let activeBlockIdx: number = -1

      if (draft.activeBlockId) {
        element = elements.get(draft.activeBlockId)

        if (element) {
          draft.lastSelection = {
            selectionStart: element.selectionStart,
            selectionEnd: element.selectionEnd,
          }

          activeBlockIdx = draft.blocks.findIndex(
            (block) => block.id === draft.activeBlockId,
          )

          if (['ArrowUp', 'ArrowLeft'].includes(key) && activeBlockIdx > 0) {
            prevElement = elements.get(draft.blocks[activeBlockIdx - 1].id)
          }

          if (
            ['ArrowDown', 'ArrowRight'].includes(key) &&
            activeBlockIdx + 1 < draft.blocks.length
          ) {
            nextElement = elements.get(draft.blocks[activeBlockIdx + 1].id)
          }
        }
      }

      switch (key) {
        case 'Enter':
          if (
            activeBlockIdx !== -1 &&
            ['heading', 'paragraph'].includes(draft.blocks[activeBlockIdx].type)
          ) {
            preventDefault()
            this.insert(draft, {
              id: uniqueId(),
              text: '',
              type: 'paragraph',
              html: '',
            })
          }
          break
        case 'Tab':
          if (
            element &&
            activeBlockIdx !== -1 &&
            ['code'].includes(draft.blocks[activeBlockIdx].type)
          ) {
            preventDefault()

            if (element.selectionStart === element.selectionEnd) {
              const { text, cursor } = withShift
                ? unindentSingleLine(
                    draft.blocks[activeBlockIdx].text,
                    element.selectionStart,
                  )
                : indentSingleLine(
                    draft.blocks[activeBlockIdx].text,
                    element.selectionStart,
                  )
              draft.blocks[activeBlockIdx].text = text

              element.blur()

              setTimeout(() => {
                element.selectionEnd = cursor
                element.selectionStart = cursor
                element.focus()
              }, 0)
            }
          }
          break
        case 'ArrowUp':
        case 'ArrowLeft':
          if (!element || !prevElement) {
            break
          }

          if (!draft.lastSelection || draft.lastSelection.selectionEnd !== 0) {
            break
          }

          prevElement.focus()
          setTimeout(() => {
            prevElement.setSelectionRange(
              prevElement.value.length,
              prevElement.value.length,
            )
          }, 0)

          this.activate(draft, draft.blocks[activeBlockIdx - 1])
          break
        case 'ArrowDown':
        case 'ArrowRight':
          if (!element || !nextElement) {
            break
          }

          if (
            !draft.lastSelection ||
            element.selectionEnd !== element.value.length ||
            draft.lastSelection.selectionEnd !== element.value.length
          ) {
            break
          }

          nextElement.focus()
          setTimeout(() => {
            nextElement.setSelectionRange(
              nextElement.value.length,
              nextElement.value.length,
            )
          }, 0)

          this.activate(draft, draft.blocks[activeBlockIdx + 1])
          break
      }
    },

    push(draft: MarkdownerState, block: Block) {
      draft.blocks.push(block)
      this.activate(draft, block)
    },

    insert(draft: MarkdownerState, block: Block) {
      const activeBlockId = draft.activeBlockId || draft.lastActiveBlockId
      if (!activeBlockId) {
        return this.push(draft, block)
      }

      for (let i = 0; i < draft.blocks.length; i++) {
        if (draft.blocks[i].id === activeBlockId) {
          draft.blocks.splice(i + 1, 0, block)
          this.activate(draft, block)
          break
        }
      }
    },

    activate(draft: MarkdownerState, block: Block) {
      draft.lastActiveBlockId = draft.activeBlockId
      draft.activeBlockId = block.id
    },

    update(draft: MarkdownerState, block: Block) {
      for (let i = 0; i < draft.blocks.length; i++) {
        if (draft.blocks[i].id === block.id) {
          draft.blocks[i] = block
          break
        }
      }
    },

    remove(draft: MarkdownerState, block: Block) {
      for (let i = 0; i < draft.blocks.length; i++) {
        if (draft.blocks[i].id === block.id) {
          draft.blocks.splice(i, 1)
          draft.activeBlockId = null
          draft.lastActiveBlockId = null
          elements.delete(block.id)

          if (i > 0) {
            this.activate(draft, draft.blocks[i - 1])
            elements.get(draft.blocks[i - 1].id)?.focus()
          }
          break
        }
      }
    },

    moveUp(draft: MarkdownerState, block: Block) {
      for (let i = 0; i < draft.blocks.length; i++) {
        if (draft.blocks[i].id === block.id) {
          const [removedBlock] = draft.blocks.splice(i, 1)
          draft.blocks.splice(i - 1, 0, removedBlock)
          break
        }
      }

      this.activate(draft, block)
      this.toggleTooltip(draft, block)
      elements.get(block.id)?.focus()
    },

    moveDown(draft: MarkdownerState, block: Block) {
      for (let i = 0; i < draft.blocks.length; i++) {
        if (draft.blocks[i].id === block.id) {
          const [removedBlock] = draft.blocks.splice(i, 1)
          draft.blocks.splice(i + 1, 0, removedBlock)
          break
        }
      }

      this.activate(draft, block)
      this.toggleTooltip(draft, block)
      elements.get(block.id)?.focus()
    },

    toggleTooltip(draft: MarkdownerState, block: Block) {
      draft.activeTooltipBlockId =
        draft.activeTooltipBlockId === null ||
        draft.activeTooltipBlockId !== block.id
          ? block.id
          : null
    },
  }
}
