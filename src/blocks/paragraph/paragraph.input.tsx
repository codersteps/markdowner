export function ParagraphInput({ pos }: { pos: number }) {
  return (
    <div key={pos}>
      <textarea placeholder="Paragraph" rows={1}></textarea>
    </div>
  )
}
