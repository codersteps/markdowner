import {
  CodeAction,
  HeadingAction,
  ParagraphAction,
  PictureAction,
} from '@/blocks'
import ListAction from '@/blocks/List/ListAction'

export function MarkdownerToolbar() {
  return (
    <div className="sticky top-3 flex justify-end z-50">
      <div className="flex space-x-1.5 bg-white rounded">
        <ParagraphAction />
        <HeadingAction />
        <CodeAction />
        <ListAction />
        <PictureAction />
      </div>
    </div>
  )
}
