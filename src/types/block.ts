export enum Level {
  H2 = 2,
  H3 = 3,
  H4 = 4,
  H5 = 5,
  H6 = 6,
}

export type Heading = {
  id: string
  type: 'heading'
  level: Level
  text: string
}

export type Paragraph = {
  id: string
  type: 'paragraph'
  text: string
  html?: string
}

export type Block = Paragraph | Heading
