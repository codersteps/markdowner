import { ParagraphAction } from '../blocks'

export function MarkdownerToolbar() {
  return (
    <div className="sticky top-3 flex justify-end z-20">
      <div className="flex space-x-1.5 bg-white rounded">
        <ParagraphAction />
      </div>
    </div>
  )
}
