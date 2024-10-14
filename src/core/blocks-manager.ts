import { uniqueId } from '.'
import {
  Block,
  MarkdownerState,
  MarkdownerElement,
  MarkdownerElements,
} from '../types'

export function buildBlocksManager(elements: MarkdownerElements) {
  return {
    keyDown(draft: MarkdownerState, key: string, preventDefault: () => void) {
      let idx: number = -1
      let element: MarkdownerElement | undefined
      let prevElement: MarkdownerElement | undefined
      let nextElement: MarkdownerElement | undefined

      if (draft.activeBlock) {
        const id = draft.activeBlock.id
        element = elements.get(id)

        if (element) {
          draft.lastSelection = {
            selectionStart: element.selectionStart,
            selectionEnd: element.selectionEnd,
          }

          idx = draft.blocks.findIndex((block) => block.id === id)

          if (['ArrowUp', 'ArrowLeft'].includes(key) && idx > 0) {
            prevElement = elements.get(draft.blocks[idx - 1].id)
          }

          if (
            ['ArrowDown', 'ArrowRight'].includes(key) &&
            idx + 1 < draft.blocks.length
          ) {
            nextElement = elements.get(draft.blocks[idx + 1].id)
          }
        }
      }

      switch (key) {
        case 'Enter':
          preventDefault()
          this.insert(draft, {
            id: uniqueId(),
            text: '',
            type: 'paragraph',
            html: '',
          })
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

          this.activate(draft, draft.blocks[idx - 1])
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

          this.activate(draft, draft.blocks[idx + 1])
          break
      }
    },

    push(draft: MarkdownerState, block: Block) {
      draft.blocks.push(block)
      this.activate(draft, block)
    },

    insert(draft: MarkdownerState, block: Block) {
      const activeBlock = draft.activeBlock || draft.lastActiveBlock
      console.log({ activeBlock })
      if (!activeBlock) {
        return this.push(draft, block)
      }

      for (let i = 0; i < draft.blocks.length; i++) {
        if (draft.blocks[i].id === activeBlock.id) {
          console.log('found')

          draft.blocks.splice(i + 1, 0, block)
          this.activate(draft, block)
          break
        }
      }
    },

    activate(draft: MarkdownerState, block: Block) {
      draft.lastActiveBlock = draft.activeBlock
      draft.activeBlock = block
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
          draft.activeBlock = null
          draft.lastActiveBlock = null
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
      draft.activeTooltip =
        draft.activeTooltip === null || draft.activeTooltip.id !== block.id
          ? block
          : null
    },
  }
}
