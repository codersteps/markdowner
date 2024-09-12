type Block = { id: string; pos: number }

export type Props = {
  blocks: Block[]
}

export function Markdowner({ blocks }: Props) {
  return (
    <div className="border border-gray-500 p-4 rounded-md">
      <strong>Markdowner</strong>: {blocks.length}
    </div>
  )
}
