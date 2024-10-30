import { MarkdownerProps } from '@/types'
import { MarkdownerProvider, uniqueId } from '@/core'
import { MarkdownerToolbar, MarkdownerBlocks } from '@/components'

export function Markdowner({
  onUpload,
  initialBlocks = [
    {
      id: uniqueId(),
      text: `setTimeout(() => {
  element.selectionEnd = cursor + tabSpaces.length
  element.selectionStart = cursor + tabSpaces.length
}, 0)`,
      lang: 'ts',
      type: 'code',
      filename: 'Untitled.ts',
      html: '',
    },
    {
      id: uniqueId(),
      text: `This snippet will change the selection to the next indented value.`,
      type: 'paragraph',
      html: '',
    },
    {
      id: uniqueId(),
      type: 'list',
      html: '',
      content: {
        type: 'unordered',
        items: [
          {
            text: 'The forest is filled with various types of trees.',
            subItems: {
              type: 'ordered',
              items: [
                {
                  text: 'Among the tallest are the evergreen pines.',
                  subItems: {
                    type: 'unordered',
                    items: [
                      { text: 'Pine cones litter the forest floor.' },
                      {
                        text: 'The pine needles create a soft carpet underfoot.',
                      },
                    ],
                  },
                },
                {
                  text: 'Oaks, on the other hand, spread wide branches.',
                  subItems: {
                    type: 'unordered',
                    items: [
                      { text: 'Their leaves turn vibrant shades in autumn.' },
                      { text: 'Acorns fall and feed many woodland creatures.' },
                    ],
                  },
                },
              ],
            },
          },
          {
            text: 'The forest is home to many animals.',
            subItems: {
              type: 'unordered',
              items: [
                {
                  text: 'Deer wander quietly, blending with the trees.',
                  subItems: {
                    type: 'ordered',
                    items: [
                      { text: 'They graze on grass and small plants.' },
                      { text: 'They are often seen at dawn and dusk.' },
                    ],
                  },
                },
                {
                  text: 'Birds of all colors fill the canopy.',
                  subItems: {
                    type: 'ordered',
                    items: [
                      { text: 'Some build nests high up in the branches.' },
                      { text: 'Others search for insects in the bark.' },
                    ],
                  },
                },
              ],
            },
          },
          {
            text: 'The forest floor is a world of its own.',
            subItems: {
              type: 'ordered',
              items: [
                {
                  text: 'Moss and fungi cover fallen logs.',
                  subItems: {
                    type: 'unordered',
                    items: [
                      {
                        text: 'Mushrooms of various colors sprout after rain.',
                      },
                      {
                        text: 'Tiny insects scuttle through the underbrush, Tiny insects scuttle through the underbrush.',
                      },
                    ],
                  },
                },
                {
                  text: 'Leaves decompose, enriching the soil.',
                  subItems: {
                    type: 'unordered',
                    items: [
                      { text: 'Earthworms tunnel and aerate the ground.' },
                      {
                        text: 'Nutrients are recycled back into the ecosystem.',
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
}: MarkdownerProps) {
  return (
    <MarkdownerProvider value={{ initialBlocks, onUpload }}>
      <div className="relative flex flex-col space-y-6">
        <MarkdownerToolbar />
        <MarkdownerBlocks />
      </div>
    </MarkdownerProvider>
  )
}
