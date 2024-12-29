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
}

export type Lang =
  | 'c'
  | 'md'
  | 'js'
  | 'ts'
  | 'jsx'
  | 'tsx'
  | 'sql'
  | 'css'
  | 'ini'
  | 'xml'
  | 'yml'
  | 'cpp'
  | 'php'
  | 'bash'
  | 'html'
  | 'scss'
  | 'json'
  | 'twig'
  | 'java'
  | 'blade'

export interface Code {
  id: string
  lang: Lang
  type: 'code'
  text: string
  filename: string
}

export type ListItem = {
  id: string
  text: string
  subItems?: ListContent
}

export type ListContent = {
  type: 'ordered' | 'unordered'
  items: ListItem[]
}

export type List = {
  id: string
  type: 'list'
  content: ListContent
}

export type Picture = {
  id: string
  type: 'picture'
  alt: string
  src: string
  caption: string
}

export type Block = Code | List | Paragraph | Picture | Heading
